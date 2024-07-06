import express from "express";

import { addOrder } from "../controllers/orders.js";

export const orderRouter = express.Router();
orderRouter.post("/", addOrder);
