import express from "express";
import {
  getAdmin,
  getAdminById,
  adminSignin,
  adminSignup,
  deleteAdmin,
} from "../controllers/admin.js";
export const adminRouter = express.Router();
adminRouter.get("/", getAdmin);
adminRouter.get("/:adminId", getAdminById);
adminRouter.post("/adminSignIn", adminSignin);
adminRouter.post("/adminSignUp", adminSignup);
adminRouter.delete("/:userId", deleteAdmin);
