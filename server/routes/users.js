import express from "express";
import { getUsers, getUserById, signin, signup } from "../controllers/users.js";
export const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserById);
userRouter.post("/signIn", signin);
userRouter.post("/signUp", signup);
