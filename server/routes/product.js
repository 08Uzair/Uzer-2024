import express from "express";

import {
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
  getProducts,
  getProductById,
} from "../controllers/products.js";

export const productRouter = express.Router();
productRouter.post('/',addProduct);
productRouter.get('/',getProducts);
productRouter.get('/:productId',getProductById);
productRouter.delete('/:productId',deleteProduct);
productRouter.put('/:productId',updateProduct);
