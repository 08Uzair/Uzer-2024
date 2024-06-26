import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  discount: {
    type: String,
  },
  rank: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

});
export const product = mongoose.model("product",productSchema)
