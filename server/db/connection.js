import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.DATA_BASE_URL;

export const connection = async () => {

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};