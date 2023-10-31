import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    title:{
        type:String, 
        required:true, 
        unique:true  
    },
    description:{
        type:String,
        required:true
    }, 
    picture:{
        type:String
    },
    createdDate:{
        type:Date,
    },
    categories:{
        type:String,
        require:true
    }

}) 

const Blog = mongoose.model("blog",blogSchema);

export default Blog;