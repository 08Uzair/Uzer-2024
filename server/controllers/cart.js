import { cart } from "../models/cart.js";

export const addCartProduct = async (req, res) => {
  const { product, user } = req.body;
  const saveData = new cart({
    product,
    user,
    createdAt: new Date().toISOString(),
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "Product Added Successfully to Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Get Cart Products
export const getCartProducts = async (req, res) => {
  try {
    const cartProducts = await cart
      .find()
      .populate("product")
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json({ cartProducts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart products" });
  }
};

// Get Cart Product by Id
export const getCartProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const cartProduct = await cart
      .findById(id)
      .populate("product")
      .populate("user");
    if (!cartProduct) {
      return res.status(404).json({ message: "Product Not Found in Cart" });
    }
    res.status(200).json(cartProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Cart Product
export const updateCartProduct = async (req, res) => {
  const { id } = req.params;
  const { product, user } = req.body;
  console.log(product);
  console.log(user);
  const updatedata = { product, user };
  console.log(updatedata);
  try {
    const updatedCartProduct = await cart
      .findByIdAndUpdate(id, updatedata, {
        new: true,
      })
      .populate("product")
      .populate("user");

    if (!updatedCartProduct) {
      return res.status(404).json({ message: "Product Not Found in Cart" });
    }
    res.status(200).json({
      updatedCartProduct,
      message: "Product Updated Successfully in Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete Cart Product
export const deleteCartProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCartProduct = await cart.findByIdAndDelete(id);
    if (!deletedCartProduct) {
      return res.status(404).json({ message: "Product Not Found in Cart" });
    }
    res.status(200).json({ message: "Product Deleted Successfully from Cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
