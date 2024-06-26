import { user } from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const secret = "uzer";

// SIGN IN
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await user.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "7d",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SIGN UP
export const signup = async (req, res) => {
  const {
    fname,
    lname,
    country,
    state,
    city,
    pinCode,
    email,
    password,
    number,
    creditCard,
    cardExpMo,
    cardExpYr,
    address1,
    address2,
    createdAt,
  } = req.body; // Include the 'category' field

  try {
    const oldUser = await user.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      fname,
      lname,
      country,
      state,
      city,
      pinCode,
      email,
      password: hashedPassword,
      number,
      creditCard,
      cardExpMo,
      cardExpYr,
      address1,
      address2,
      createdAt,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "7d",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    error;
  }
};

//Get User
export const getUsers = async (req, res) => {
  try {
    const products = await user
      .find()
      .sort({ createdAt: -1 })
      .populate("author")
      .populate("category");
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get User by Id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await user.findById(id);
    if (!users) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
