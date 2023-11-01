import express from "express";
import { login, signUp } from "../controller/userC.js";
import { uploadImage, getImage } from "../controller/uploadImage.js";
import {getAllComments, setComment} from "../controller/comment.controller.js";

import {
  blogUpload, 
  deletePost,
  getAllPost,
  getPost,         
  getSinglePost,
  updatePost,
} from "../controller/blogUploadC.js";
import uploadFile from "../utils/uploadFile.js";
import { authToken } from "../controller/jwtC.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);     
  
router.post("/create", authToken, blogUpload);

router.post("/file/upload", uploadFile.single("file"), uploadImage);
router.get("/file/:filename", getImage);
 
router.get("/allpost", getAllPost);
router.get("/post/:category", getPost);
router.get("/post/details/:_id", getSinglePost);
router.put("/post/update/:_id",authToken, updatePost);
router.delete("/post/delete/:_id",authToken, deletePost);

router.post("/comment",setComment)
router.get("/all/comments/:_id",getAllComments)

router.get("/auth",authToken)
export default router;   
