import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  postId: {
    type: String,  
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
