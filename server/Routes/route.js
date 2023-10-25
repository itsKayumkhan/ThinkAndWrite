import  express from "express";
import { login, signUp } from "../controller/userC.js";
import { uploadImage, getImage } from "../controller/uploadImage.js";
import uploadFile from "../utils/uploadFile.js";

const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);

// router.post("/create",createPost );

router.post("/file/upload",uploadFile.single("file"),uploadImage);
router.get("/file/:filename",getImage);

export default router;