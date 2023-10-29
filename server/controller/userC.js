import mongoose from "mongoose";
import User from "../model/userM.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../model/tokenM.js";

dotenv.config();

export const signUp = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const name = firstName + lastName;
    const newUser = new User({ email, name, password: hashPassword });
    await newUser.save();

    // Send a success response
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, checkUser.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const accessToken = jwt.sign({ userId: checkUser._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId: checkUser._id }, process.env.REFRESH_TOKEN);

    const token = new Token({ token: refreshToken });
    await token.save();

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      accessToken,
      refreshToken,
      name: checkUser.name,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
