import mongoose from "mongoose";
import { product } from "./products";

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type : String,
    required:true
  },
  paymentInfo:{
    id:
    {
      type:String,
      required:true
    },
    status:
    {
      type:String,
      required:true
    },
    paidAt:
    {
      type:String,
      required:true
    },
    itemsPrice:
    {
      type:String,
      required:true
    },
    taxPrice:
    {
      type:String,
      required:true
    },
    shippingPrice:
    {
      type:String,
      required:true
    },
    totalPrice:
    {
      type:String,
      required:true
    },
    orderStatus:
    {
      type:String,
      required:true,
      default:"Processing"
    },
    deliveredAt:
    {
     createdAt:Date,
     createdAt:{
      type:Date,
      default:Date.now
     }
    },
  }
});



export const order = mongoose.model("order", orderSchema);
