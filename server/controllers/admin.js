import { admin } from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const secret = "uzer";

// SIGN IN
export const adminSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldAdmin = await admin.findOne({ email });

    if (!oldAdmin)
      return res.status(404).json({ message: "admin doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldAdmin.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldAdmin.email, id: oldAdmin._id },
      secret,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ result: oldAdmin, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SIGN UP
export const adminSignup = async (req, res) => {
  const {
    avatar,
    fname,
    lname,
    country,
    state,
    city,
    pinCode,
    email,
    password,
    number,
    address1,
    address2,
    createdAt,
  } = req.body; // Include the 'category' field

  try {
    const oldAdmin = await admin.findOne({ email });

    if (oldAdmin)
      return res.status(400).json({ message: "admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await admin.create({
      avatar,
      fname,
      lname,
      country,
      state,
      city,
      pinCode,
      email,
      password: hashedPassword,
      number,
      address1,
      address2,
      createdAt,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "7d",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

//Get Admin
export const getAdmin = async (req, res) => {
  try {
    const admins = await admin.find().sort({ createdAt: -1 });
    res.status(200).json({ admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get Admin by Id
export const getAdminById = async (req, res) => {
  const { adminId } = req.params;
  try {
    const admins = await admin.findById(adminId);
    if (!admins) {
      return res.status(404).json({ message: "Admin Not Found" });
    }
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Admin
export const deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    const deletedAdmin = await admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }
    res.status(200).json({ message: "Admin Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
