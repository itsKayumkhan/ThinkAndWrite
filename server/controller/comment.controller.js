import Comment from "../model/comment.model.js";

export const setComment = async (req, res) => {
  try {
    console.log(req.data);
    const comment = new Comment(req.body); 
    await comment.save();  

    res.status(200).json({ success: true, message: "comment added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const _id = req.params._id
    const comments = await Comment.find({postId:_id});

    res.status(200).json({ success: true, message: "comment added", comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
