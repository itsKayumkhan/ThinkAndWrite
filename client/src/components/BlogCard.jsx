import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { addElipsis } from "../utils/common.util";
import { UserContext } from "../Context/User";
import { useNavigate } from "react-router-dom";
// import Error from "../Pages/Error";
const BlogCard = () => {
  const { post, setPost } = useContext(UserContext);
  const URL =
    "https://imgs.search.brave.com/ZWhmb-dHRWtsVjSsHXOUQNDOUUPehfbA8kmlQFTF8z0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzM1LzE0LzU1/LzM2MF9GXzMzNTE0/NTUwMV84Q3JTSWhV/WUJzRzdGZ0g3WVBI/Rkkwclk1SWViUXlF/Ty5qcGc";

    const navigate=useNavigate();
  const getAllPost = async () => {
    const res = await axios.get("http://localhost:8000/allpost");
    // setPost(res);
    if (res) {
      setPost(res.data.allPost);
      console.log(post);
    }
  };

  const blogDetails = (_id) =>{
    navigate(`/post/details/${_id}`)
  }

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      {post && post.length > 0 ? (
        post.map((item) => {
            return (
            <div key={item._id} className="mx-10 rounded-xl" onClick={()=>blogDetails(item._id)}>
          
              <div className="my-5">
                <div className=" w-full lg:max-w-full lg:flex ">
                  <div
                    className="h-48  lg:w-1/4 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    title="Mountain"
                  >
                    <img
                      src={item.picture ? item.picture : URL}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-slate-100 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-3/4">
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
                        src={item.picture}
                        alt="Avatar of Writer"
                      />
                      <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                          {item.username}
                        </p>
                        <p className="text-gray-600">{item.createdDate}</p>
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
        <h1 className="text-white mt-10 text-2xl">
          Nothing to found !!
        </h1>
       </div>
      )}
    </>
  );
};

export default BlogCard;

