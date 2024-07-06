import { order } from "../models/orders.js";

// Add Product
export const addOrder = async (req, res) => {
  // const author = req.userId;
  const { quantity, itemsPrice, taxPrice, totalPrice, paymentInfo } = req.body;
  console.log(paymentInfo);
  const saveData = new order({
    quantity,
    itemsPrice,
    taxPrice,
    totalPrice,
    paymentInfo,
    createdAt: new Date().toISOString(),
  });
  console.log(saveData);
  try {
    await saveData.save();
    res.status(200).json({ message: "Order Added Sucessfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

