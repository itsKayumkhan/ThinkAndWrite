import Blog from "../model/blogM.js";

export const blogUpload = async (req, res) => {
  try {
    const post = await new Blog(req.body);
    await post.save();

    res
      .status(200)
      .send({ success: true, message: "Post created successfully" });
  } catch (error) {
    res.status(404).send({ success: false, message: "Something went wrong" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPost = await Blog.find();
     res
      .status(200)
      .send({ success: true, message: "all Post Fetch successfully", allPost });
  } catch (error) {
    console.log(error);
     res
      .status(500)
      .send({ success: true, message: "Something went wrong !!" });
  }
};

export const getPost = async (req, res) => {
  try {
    const category = req.params.category;
    const posts = await Blog.find({ categories: category });

    if (posts) {
      res.status(200).send({ success: true, message: "Blog Fetch successfully", posts });
    } else {
      res.status(500).send({ success: false, message: "Error in Blog Fetching" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }     
};
 
export const getSinglePost = async (req, res) => {
  try {
    const _id = req.params._id;
    const post = await Blog.findById(_id ); 
    if (post) {
      res.status(200).send({ success: true, message: "Blog Fetch successfully", post });
    } else {
      res.status(500).send({ success: false, message: "Error in Blog Fetching" });
    }
  } catch (error) { 
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

 
export const updatePost = async (req, res) => {
  try {
    const _id = req.params._id;
    const getPost = await Blog.findById(_id ); 

    if(!getPost) return res.status(404).send({success:false,message:"Blog not found"});

    const post = await Blog.findByIdAndUpdate(_id,{$set:req.body}); 
    if (post) {
     return res.status(200).send({ success: true, message: "Blog Update successfully", post });
    } else {
     return res.status(500).send({ success: false, message: "Error in Blog Updating" });
    }
  } catch (error) { 
    console.log(error);
   return  res.status(500).send({ success: false, message: "Something went wrong" });
  }
}



