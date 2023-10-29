import mongoose from "mongoose";
import grid from "gridfs-stream" 

const url = "http://localhost:8000";

let gfs,gridFsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(404).send({ success: false, message: "File not found" });
  }
  const imageUrl = `${url}/file/${req.file.filename}`;
  console.log(imageUrl)
  return res.status(200).send({ imageUrl });
};
 
const getImage = async(req,res)=>{
    try {
       const file = await gfs.files.findOne({filename:req.params.filename});
       const readStream = gridFsBucket.openDownloadStream(file._id);
       readStream.pipe(res);
        
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"Something went wrong in file "})
    }
}


export {uploadImage,getImage};
