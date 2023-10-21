import mongoose from "mongoose";
import User from "../model/userM.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = User({ email, firstName, lastName, password: hashPassword });
  await newUser.save();

  // Send a success response
  res.status(201).send({ success: true, message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    return res.status(404).send({ success: false, message: "User not found" });
  }

  const match = await bcrypt.compare(password, checkUser.password);
  if (!match) {
    return res.status(401).send({ success: false, message: "Invalid password" });
  }

  res.status(200).send({ success: true, message: "Login Successfully" });
};