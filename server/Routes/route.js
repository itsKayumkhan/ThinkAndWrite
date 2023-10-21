import  express from "express";
import { login, signUp } from "../controller/userC.js";

const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);

export default router;