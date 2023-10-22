//NOTE 
//!Login func is not completed yet

import mongoose from "mongoose";
import User from "../model/userM.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import Token from "../model/tokenM.js";

dotenv.config();
export const signUp = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const name = firstName + lastName;
  const newUser = User({ email, name, password: hashPassword });
  await newUser.save();

  // Send a success response
  res
    .status(201)
    .send({ success: true, message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    return res.status(404).send({ success: false, message: "User not found" });
  }
try {
  const match = await bcrypt.compare(password, checkUser.password);
  if (!match) {
    return res.status(401).send({ success: false, message: "Invalid password" });
  }

  const accessToken = jwt.sign(checkUser.toJSON(),`Bearer ${process.env.ACCESS_TOKEN}` ,{
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(checkUser.toJSON(),`Bearer ${process.env.REFRESH_TOKEN}`);


  const token = new Token({token:refreshToken})
  await token.save();

  res.status(200).send({
    success: true,
    message: "Login Successfully",
    accessToken,
    refreshToken,
    name: checkUser.name,
  });
} catch (error) {
   res.status(500).send({ success: false, message: "Something went wrong" });
  
}
 
};

