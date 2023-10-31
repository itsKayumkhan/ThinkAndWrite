import Blog from "../model/blogM.js";

export const blogUpload = async (req, res) => {
  try {
    const post = new Blog(req.body);
    await post.save();

    return res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPosts = await Blog.find();
    return res
      .status(200)
      .json({
        success: true,
        message: "All Posts fetched successfully",
        allPosts,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const getPost = async (req, res) => {
  try {
    const category = req.params.category;
    const posts = await Blog.find({ categories: category });

    if (posts.length > 0) {
      return res   
        .status(200)
        .json({ success: true, message: "Blogs fetched successfully", posts });
    } else {
      return res
        .status(404)
        .json({
          success: false,
          message: "No blogs found for the specified category",
        });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const _id = req.params._id;
    const post = await Blog.findById(_id);

    if (post) {
      return res
        .status(200)
        .json({ success: true, message: "Blog fetched successfully", post });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const _id = req.params;
    const updatedPost = await Blog.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (updatedPost) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Blog updated successfully",
          updatedPost,
        });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const _id = req.params;
    const deletePost = await Blog.findByIdAndDelete(_id);

    if (deletePost) {
      return res
        .status(200)
        .json({ success: true, message: "Blog deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
