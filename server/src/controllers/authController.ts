import { Account, JWT_EXPIRIES } from "../constants";
import client from "../config/sgid";
import { prisma } from "../config/database";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { randomUUID } from "crypto";
import { generatePkcePair } from "@opengovsg/sgid-client";

type User = {
  id: number;
  displayName: string;
  accountType: number;
  approved: boolean;
};

const AUTHORISE = process.env.AUTHORISE === "true";
const JWT_SECRET = process.env.JWT_SECRET as string;
const CLIENT_URL = process.env.CLIENT_URL + "/";

const generateUrl = async (req: Request, res: Response) => {
  console.log("clientUrl: ", CLIENT_URL);

  const sessionId = randomUUID();
  const { codeChallenge, codeVerifier } = generatePkcePair(120);

  await prisma.codeVerifier.create({
    data: { sessionId, verifier: codeVerifier },
  });

  const loginUrl = client.authorizationUrl({
    state: "login",
    codeChallenge,
    scope: "openid",
    nonce: null,
  }).url;

  res.status(200).json({ loginUrl, sessionId });
};

const login = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { sessionId } = req.query;
  console.log("sessionId: ", sessionId);

  try {
    const { verifier: codeVerifier } = await prisma.codeVerifier.delete({
      where: { sessionId: sessionId as string },
      select: { verifier: true },
    });

    console.log("codeVerifier: ", codeVerifier);
    const { sub: openId } = await client.callback({
      code,
      nonce: null,
      codeVerifier,
    });

    console.log("openId: ", openId);

    try {
      const userData = await prisma.userModel.findUniqueOrThrow({
        where: { openId } as any,
        select: {
          id: true,
          displayName: true,
          accountType: true,
          approved: true,
        },
      });
      if (userData.approved) {
        const jwtExpiry = JWT_EXPIRIES[userData.accountType as Account];
        const token = jwt.sign(userData, JWT_SECRET, {
          expiresIn: jwtExpiry,
        });
        res.status(200).json({ token });
      } else {
        res.status(400).json({
          alert: "Your requested account has not been approved",
        });
      }
    } catch (error: any) {
      const prismaError = error as PrismaClientKnownRequestError;
      if (prismaError.code === "P2025") {
        res.status(404).json(openId);
      } else {
        res.status(500);
      }
    }
  } catch (error) {
    //SG ID client unavailable
    console.log(error);
    res.status(500);
  }
};

const findUser = async (req: Request, res: Response) => {
  const { openId } = req.params;

  const userData = await prisma.userModel.findUniqueOrThrow({
    where: { openId } as any,
    select: {
      id: true,
      displayName: true,
      accountType: true,
    },
  });

  const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "1h" });
  res.json(token);
};

const isAuth =
  (authorized: number[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Authorizing...");
    if (!AUTHORISE) {
      console.log("Not authorizing user");
      return next();
    }
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1].toString();

    try {
      if (!token) {
        throw new Error("No token provided");
      }

      const verifiedUser = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      ) as User;

      if (!verifiedUser) {
        throw new Error("Invalid/expired token");
      }

      if (!authorized.includes(verifiedUser.accountType)) {
        throw new Error("Unauthorized to access resource");
      }
      req.headers.authorization = JSON.stringify(verifiedUser);
    } catch (err) {
      const error = err as Error;
      console.log(err);
      return res.status(404).json({ error: error.message });
    }
    return next();
  };

export { generateUrl, isAuth, login, findUser };
