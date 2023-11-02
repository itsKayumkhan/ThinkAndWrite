import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { UserContext } from "../Context/User";
import { UserPhoto } from "../utils/common.util";
import toast from "react-hot-toast";

const URL =
  "https://imgs.search.brave.com/ZWhmb-dHRWtsVjSsHXOUQNDOUUPehfbA8kmlQFTF8z0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzM1LzE0LzU1/LzM2MF9GXzMzNTE0/NTUwMV84Q3JTSWhV/WUJzRzdGZ0g3WVBI/Rkkwclk1SWViUXlF/Ty5qcGc";

const BlogDetails = () => {
  let { _id } = useParams();
  const [post, setPost] = useState([]);
  const { userName, headers } = useContext(UserContext);

  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/post/details/${_id}`, {
        headers,
      });
      setPost(res.data.post);
      toast.success(res.data.message);

    } catch (error) {
      console.log(error);
    }
  };
  const fetchDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/post/delete/${_id}`,
        {
          headers,
        }
      );

      if(res){
      toast.success(res.data.message);

        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto">
        <main className="mt-10">
          <div
            className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
            style={{ height: "24em" }}
          >
            <div
              className="absolute left-0 bottom-0 w-full h-full z-10"
              style={{
                backgroundImage:
                  "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
              }}
            />
            <img
              src={post.picture ? post.picture : URL}
              className="absolute  w-full h-full z-0 object-cover "
            />
            <div className="p-4 break-words absolute bottom-0 left-0 z-20 w-full">
              <a
                href="#"
                className=" px-4 py-1 bg-slate-900 text-white shadow-inner shadow-white inline-flex items-center justify-center mb-2"
              >
                {post.categories}
              </a>
              <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                {post.title}
              </h2>
              <div className="flex justify-between items-center w-full">
                <div className="flex mt-3 pe-5 py-2 rounded  bg-opacity-50">
                  <img
                    src={UserPhoto}
                    className="bg-white h-10 w-10 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {post.username}
                    </p>
                    <p className="font-semibold text-slate-100 text-xs">
                      {new Date(post.createdDate).toDateString()}
                    </p>
                  </div>
                </div>

                {userName === post.username ? (
                  <div className="flex items-center justify-center">
                    <Link to={`/post/update/:${post._id}`}>
                      <i className="fa-regular fa-pen-to-square px-2 text-2xl text-white cursor-pointer "></i>
                    </Link>
                    <Link onClick={fetchDelete}>
                      <i className="fa-solid fa-trash px-2 text-2xl text-white cursor-pointer "></i>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="px-4 lg:px-0 mt-12 text-white max-w-screen-md mx-auto text-lg leading-relaxed">
            <div className="border-l-4 border-white pl-4 mb-6 italic rounded">
              {post.description}
            </div>
          </div>
        </main>
        <Comments post={post}/>
      </div>
    </div>
  );
};

export default BlogDetails;
