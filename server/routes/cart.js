import express from "express";

import {
  addCartProduct,
  getCartProducts,
  getCartProductById,
  deleteCartProduct,
  updateCartProduct,
} from "../controllers/cart.js";
export const cartRouter = express.Router();
cartRouter.post("/", addCartProduct);
cartRouter.get("/", getCartProducts);
cartRouter.get("/:id", getCartProductById);
cartRouter.put("/:id", updateCartProduct);
cartRouter.delete("/:id", deleteCartProduct);
