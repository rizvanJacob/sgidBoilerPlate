import { prisma } from "../config/database";
import { Request, Response } from "express";

const usersController = {
  createUser: async (req: Request, res: Response, err: any) => {
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
