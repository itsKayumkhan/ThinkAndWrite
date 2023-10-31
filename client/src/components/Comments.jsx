import React, { useContext, useEffect, useState } from "react";
import { UserPhoto } from "../utils/common.util";
import { UserContext } from "../Context/User";
import axios from "axios";

const Comments = ({ post }) => {
  const { userName, headers } = useContext(UserContext);
  const initialComments = {
    name: "",
    postId: "",
    comment: "",
    date: new Date().toDateString(),
  };
  const [comment, setComment] = useState(initialComments);
  const [comments, setComments] = useState([]);
  const [reRender,setRerender] = useState(false);
  const handelComments = (e) => {
    setComment({
      ...comment,
      name: userName,
      postId: post._id,
      comment: e.target.value,
    });
  };

  const addComment = async () => {
    const res = await axios.post("http://localhost:8000/comment", comment, {
      headers,
    });
    setRerender(!reRender);
    if (res.data.success) {
      setComment(initialComments);
    }
  };

  const getComments = async () => {
    try {
      console.log(post._id);
      const res = await axios.get(
        `http://localhost:8000/all/comments/${post._id}`,
        { headers }
      );
      if (res.data.success) setComments(res.data.comments);
      else console.log(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComments();
  }, [comment,reRender]);
  return (
    <div>
      <section className="w-screen flex items-center justify-center ">
        <div className="px-2 py-4  hover:border-blue-200 mb-4 md:mb-0 w-full max-w-screen-md relative">
          <form className="mt-4 bg-slate-800 py-5 px-4 rounded-xl">
            <label htmlFor="comment" className="block">
              <textarea
                id="comment"
                cols={30}
                rows={3}
                value={comment.comment}
                onChange={(e) => handelComments(e)}
                placeholder="Type your comment..."
                className="resize-none  px-3 py-2 border shadow-sm border-gray-300 rounded-md w-full block placeholder:text-gray-400 placeholder-gray-500
focus:outline-none focus:ring-1 bg-gray-50 focus:ring-slate-200 focus:border-slate-400 text-sm"
              />
            </label>
            <button
              type="button"
              onClick={addComment}
              className="mt-2  inline-flex items-center justify-center text-gray-100 font-medium leading-none
    bg-blue-600 rounded-md py-2 px-3 border border-transparent transform-gpu hover:-translate-y-0.5 
    transition-all ease-in duration-300 hover:text-gray-200 hover:bg-blue-700 text-sm"
            >
              Post comment
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 rotate-90"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
          <div className="my-4">
            <small className="text-base font-bold text-white ml-1">
              comments
            </small>
            {comments?.map((user) => (
              <div className="flex flex-col mt-4 border border-x-0 border-t-0 py-2">
                <div className="flex flex-row  justify-between px-1 py-1">
                  <div className="flex mr-2">
                    <div className="items-center justify-center w-12 h-12 mx-auto bg-white rounded-full">
                      <img
                        alt="profile"
                        src={UserPhoto}
                        className="object-cover w-12 h-12 mx-auto rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1 pl-1">
                    <div className="text-base font-semibold text-white">
                      {user.name}
                      <span className="text-sm font-normal text-gray-400">
                        - {user.date}
                      </span>
                    </div>
                    <div className="text-sm text-white">{user.comment}</div>
                    <div className="flex items-center text-sm mt-1 space-x-3">
                      <a
                        href="#"
                        className="flex items-center text-red-500 hover:text-red-600 group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 group-hover:text-red-600 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-semibold ">11</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comments;
