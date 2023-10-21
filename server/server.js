import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./db/connection.js";
import router from "./Routes/route.js";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
connection();

app.use('/',router)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
