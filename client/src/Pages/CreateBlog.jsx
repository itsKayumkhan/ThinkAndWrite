import React, { useContext, useEffect, useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import { UserContext } from "../Context/User";
import axios from "axios";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreateBlog = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

  const { userName } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handelPost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const url = post.picture
    ? post.picture
    : "https://imgs.search.brave.com/ZWhmb-dHRWtsVjSsHXOUQNDOUUPehfbA8kmlQFTF8z0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzM1LzE0LzU1/LzM2MF9GXzMzNTE0/NTUwMV84Q3JTSWhV/WUJzRzdGZ0g3WVBI/Rkkwclk1SWViUXlF/Ty5qcGc ";


    const publicPost =()=>{
      const res  = axios.post("http://localhost:8000/create",post);
      res.success && navigate("/")
    }


  useEffect(() => {
    const getImg = () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        //TODO - api call
        const res = axios.post("http://localhost:8000/file/upload", data);

        post.picture = res.data;
      }
 };
      getImg();
      post.categories = location.search?.split("=")[1] || "All";
      post.username = userName;
   
  }, [file]);

  return (
    <div className="w-full flex items-center justify-center h-[80vh] ">
      <div className="main bg-slate-500 w-1/2 rounded p-4 flex flex-col justify-end items-end">
        <div class="w-full mt-5">
          <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="font-medium text-gray-600">
                Drop your Image , or
                <span className="text-blue-600 underline"> browse</span>
              </span>
            </span>
            <input
              type="file"
              name="file_upload"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
          </label>
        </div>
        <div className="flex w-full">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <i className="mdi mdi-account-outline text-gray-400 text-lg" />
          </div>
          <input
            type="text"
            name="title"
            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg mt-5 border-2 border-gray-200 outline-none focus:border-slate-600"
            placeholder="Title"
            value={post.title}
            onChange={(e) => handelPost(e)}
          />
        </div>
        <div className="flex w-full mt-5">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <i className="mdi mdi-account-outline text-gray-400 text-lg" />
          </div>
          <textarea
            type="text"
            name="description"
            value={post.description}
            onChange={(e) => handelPost(e)}
            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 resize-none h-24 border-gray-200 outline-none focus:border-slate-600"
            placeholder="write description..."
          />
        </div>
        <div
        onClick={publicPost()} 
        className="btn text-white bg-slate-700 flex items-center justify-center w-40 rounded mt-3 p-3 cursor-pointer">
          Public
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
