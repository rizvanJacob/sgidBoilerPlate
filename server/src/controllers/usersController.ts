import { prisma } from "../config/database";
import { Request, Response } from "express";
import { Account } from "../constants";

const usersController = {
  createUser: async (req: Request, res: Response, err: any) => {
    const { openId, displayName } = req.body;
    const accountType = Account.User;

    if (!openId || !displayName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const newUser = await prisma.userModel.create({
        data: { openId, displayName, accountType },
      });
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again later" });
    }
  },

  getAllUsers: async (req: Request, res: Response, err: any) => {
    try {
      const users = await prisma.userModel.findMany({
        include: { accountTypes: true },
      });

      const returnUsers = users.map((user) => {
        return {
          id: user.id,
          displayName: user.displayName,
          accountType: user.accountTypes.name,
          approved: user.approved,
        };
      });

      return res.status(200).json(returnUsers);
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again later" });
    }
  },

  getUserById: async (req: Request, res: Response, err: any) => {
    const { userId } = req.params;
    console.log(userId);

    if (!parseInt(userId)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const id = parseInt(userId);

    try {
      const user = await prisma.userModel.findUniqueOrThrow({
        where: { id },
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again later" });
    }
  },

  updateUserById: async (req: Request, res: Response, err: any) => {
    const { userId } = req.params;
    if (!parseInt(userId)) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const id = parseInt(userId);
    const user = req.body;
    if (!isValidUser(user, id)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const updatedUser = await prisma.userModel.update({
        where: { id },
        data: {
          displayName: user.displayName,
          accountType: user.accountType,
          approved: user.approved,
        },
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again later" });
    }
  },

  deleteUserById: async (req: Request, res: Response, err: any) => {
    const { userId } = req.params;
    if (!parseInt(userId)) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const id = parseInt(userId);

    try {
      const deletedUser = await prisma.userModel.delete({
        where: { id },
      });
      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again later" });
    }
  },

  getAllAccountTypes: async (req: Request, res: Response, err: any) => {
    try {
      const accountTypes = await prisma.accountType.findMany();
      console.log(accountTypes);
      return res.status(200).json(accountTypes);
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again later" });
    }
  },
};

export default usersController;

const isValidUser = (user: any, id: number) => {
  if (!user) return false;
  console.log("116");
  if (!(user.id === id)) return false;
  console.log("118");
  if (!(user.accountType in Account)) return false;
  console.log("120");
  if (!user.displayName) return false;
  console.log("122");
  //if (!user.approved) return false; //this user is the user that is being updated, not logged in, dont need this
  //console.log("124");
  if (!user.openId) return false;
  console.log("126");
  return true;
};
