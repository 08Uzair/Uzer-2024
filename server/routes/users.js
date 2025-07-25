import express from "express";
import {
  getUsers,
  getUserById,
  signin,
  signup,
  deleteUser,
  updateUser,
} from "../controllers/users.js";
export const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserById);
userRouter.post("/signIn", signin);
userRouter.post("/signUp", signup);
userRouter.delete("/:userId", deleteUser);
userRouter.put("/:userId", updateUser);
