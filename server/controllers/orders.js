import { order } from "../models/orders";

// Add Product
export const addOrder = async (req, res) => {
  // console.log(req.body);
  // const author = req.userId;
  console.log(req.body);
  const { quantity, itemsPrice, taxPrice, totalPrice } = req.body;
  console.log(req.body);
  const saveData = new order({
    quantity,
    itemsPrice,
    taxPrice,
    totalPrice,
    createdAt: new Date().toISOString(),
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "Order Added Sucessfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};
