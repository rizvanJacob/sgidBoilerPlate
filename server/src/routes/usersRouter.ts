import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController";
import { isAuth } from "../controllers/authController";
import { ADMINS } from "../constants";

router.get("/accountTypes", isAuth(ADMINS), usersController.getAllAccountTypes);

router.get("/", isAuth(ADMINS), usersController.getAllUsers);
router.post("/", usersController.createUser);
router.get("/:userId", isAuth(ADMINS), usersController.getUserById);
router.put("/:userId", isAuth(ADMINS), usersController.updateUserById);
router.delete("/:userId", isAuth(ADMINS), usersController.deleteUserById);

export default router;
