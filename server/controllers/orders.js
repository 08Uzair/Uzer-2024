import { order } from "../models/orders.js";

// Add Order
export const addOrder = async (req, res) => {
  const { product, user, quantity, paymentInfo,status } = req.body;
  const saveData = new order({
    product,
    user,
    status,
    quantity,
    paymentInfo: {
      ...paymentInfo,
      orderStatus: paymentInfo.orderStatus || "Processing",
      deliveredAt: paymentInfo.deliveredAt || { createdAt: new Date() },
    },
  });
  // console.log(saveData);

  try {
    await saveData.save();
    res.status(200).json({ message: "Order Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await order
      .find()
      .populate("product")
      .populate("user")
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ORDERS

export const updateOrderStatus = async (req, res) => {
  const { userId } = req.params;
  const { status, createdAt } = req.body;
  try {
    const updatedata = {
      status,
      createdAt,
    };
    const updatedOrder = await order.findByIdAndUpdate(userId, updatedata, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    res
      .status(200)
      .json({
        updateOrder: updateOrderStatus,
        message: "Order Updated Sucessfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// GET ORDER BY USERID

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await order
      .find({ user: userId })
      .populate("product")
      .populate("user")
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order Not Found " });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTotalPrice = async (req, res) => {
  try {
    const result = await order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $toDouble: "$paymentInfo.totalPrice" } },
        },
      },
    ]);
    console.log(result);
    if (result.length > 0) {
      const totalPriceSum = result[0].total;
      res.json({ totalPriceSum });
    } else {
      res
        .status(404)
        .json({ error: "No orders found or totalPrice not found in orders." });
    }
  } catch (error) {
    console.error("Error calculating total price sum:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
