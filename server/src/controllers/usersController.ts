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

    console.log("Create user");
  },

  getAllUsers: async (req: Request, res: Response, err: any) => {
    console.log("get all users");
  },

  getUserById: async (req: Request, res: Response, err: any) => {
    console.log("get user by id");
  },

  updateUserById: async (req: Request, res: Response, err: any) => {
    console.log("update user");
  },

  deleteUserById: async (req: Request, res: Response, err: any) => {
    console.log("delete user");
  },
};

export default usersController;
