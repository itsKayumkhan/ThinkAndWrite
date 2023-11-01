import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/User";
import toast from "react-hot-toast";

const ListItem = () => {
  const ListItems = ["Music", "Movies", "Sports", "Tech", "Fashion"];
  const { post, setPost, headers } = useContext(UserContext);
  const [searchParams] = useSearchParams(); // Invoke useSearchParams
  const [media, setMedia] = useState(false);
  const [listMenu, setListMenu] = useState(false);
  const category = searchParams.get("category");
  const filterCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/post/${category}`, {
        headers,
      });

      if (res.status === 200) {
        setPost(res.data.posts);
        // console.log(res.data.message)
        toast.success(res.data.message);
      }
      if (!res.data.success) {
        // console.log(res.data.message)
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const getAllPost = async () => {
    const res = await axios.get("http://localhost:8000/allpost", { headers });
    // setPost(res);
    try {
      if (res) {
        setPost(res.data.allPosts);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
    }
  };
  useEffect(() => {
    const checkMedia = () => {
      if (window.innerWidth < 768) {
        setMedia(true);
      } else {
        setMedia(false); 
      }
    };

    checkMedia();

    window.addEventListener("resize", checkMedia);
    return () => {
      window.removeEventListener("resize", checkMedia);
    };
  }, []);
  useEffect(() => {
    filterCategory();
  }, [category]);

  return (
    <ul
      className={`flex mx-auto items-center justify-center mt-4 bg-white h-12 `}
    >
      <li className="h-full bg-black flex items-center justify-center hover:scale-90 hover:rounded-md">
        <NavLink
          to={`/create?category=${category || ""}`}
          className="rounded text-white mx-3"
        >
          Create Blog
        </NavLink>
      </li>
      <NavLink to="/">
        <li
          onClick={getAllPost}
          className="px-4 text-xl font-medium cursor-pointer shadow-white text-blue-700"
        >
          All
        </li>
      </NavLink>
      {!media ? (
        ListItems.map((item, i) => (
          <li
            key={i}
            className="px-4 text-xl font-medium cursor-pointer shadow-white text-black"
          >
            <NavLink
              to={`/?category=${item || ""}`}
              className="hover:text-blue-500"
            >
              {item}
            </NavLink>
          </li>
        ))
      ) : (
        <div>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className=" rounded-lg px-5 py-2.5 text-center inline-flex items-center relative text-xl font-semibold text-blue-700"
            type="button"
            onClick={() => setListMenu(!listMenu)}
          >
           {category}
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {listMenu && (
            <div
              id="dropdown"
              className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {ListItems.map((item, i) => (
                  <li key={i} 
                  onClick={() => setListMenu(!listMenu)}className="text-xl border-b ">
                    <Link
                      to={`/?category=${item || ""}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </ul>
  );
};

export default ListItem;
