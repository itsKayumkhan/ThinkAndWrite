import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserPhoto, addElipsis } from "../utils/common.util";
import { UserContext } from "../Context/User";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import Error from "../Pages/Error";
const BlogCard = () => {
  const { post, setPost, headers } = useContext(UserContext);
  const URL =
    "https://imgs.search.brave.com/ZWhmb-dHRWtsVjSsHXOUQNDOUUPehfbA8kmlQFTF8z0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzM1LzE0LzU1/LzM2MF9GXzMzNTE0/NTUwMV84Q3JTSWhV/WUJzRzdGZ0g3WVBI/Rkkwclk1SWViUXlF/Ty5qcGc";

  const navigate = useNavigate();
  const getAllPost = async () => {
    const res = await axios.get("http://localhost:8000/allpost", { headers });
    // setPost(res);
    if (res.data.success) {
      setPost(res.data.allPosts);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  const blogDetails = (_id) => {
    navigate(`/post/details/${_id}`);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      {post && post.length > 0 ? (
        post.map((item) => {
          return (
            <div
              key={item._id}
              className="mx-10 rounded-xl"
              onClick={() => blogDetails(item._id)}
            >
              <div className="my-8">
                <div className=" w-full lg:max-w-full lg:flex ">
                  <div
                    className="h-48 relative lg:w-1/4 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    title="Mountain"
                  >
                    <img
                      src={item.picture ? item.picture : URL}
                      alt=""
                      className="object-cover w-full h-full z-0"
                    />
                    <h1 className="absolute px-4 py-1 bg-slate-900 text-white font-bold text-xl shadow-black z-1 inline-flex items-center justify-center mb-2 top-0 w-full bg-opacity-60 left-0">
                      {item.categories}
                    </h1>
                  </div>
                  <div className="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-slate-100 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <div className="text-gray-900 font-bold text-xl mb-2 truncate">
                        {/* {addElipsis(item.title,20)} */ item.title}
                      </div>
                      <p className="text-gray-700 text-base break-words">
                        {
                          /* {addElipsis(item.description,80)} */ item.description
                        }
                      </p>
                    </div>
                    <div className="flex items-center">
                      <img
                        className="w-10 overflow-hidden h-10 rounded-full mr-4 "
                        src={UserPhoto}
                        alt="Avatar of Writer"
                      />
                      <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                          {item.username}
                        </p>
                        <p className="text-gray-600">
                          {new Date(item.createdDate).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center">
          <h1 className="text-white mt-10 text-2xl">Nothing to found !!</h1>
        </div>
      )}
    </>
  );
};

export default BlogCard;
