import axios from "axios";
import React, { useContext, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/User";
import toast from "react-hot-toast";

const ListItem = () => {
  const ListItems = ["Music", "Movies", "Sports", "Tech", "Fashion"];
  const { post, setPost, headers } = useContext(UserContext);
  const [searchParams] = useSearchParams(); // Invoke useSearchParams

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
    filterCategory();
  }, [category]);

  return (
    <ul className="flex mx-auto items-center justify-center mt-4 bg-white h-12">
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
      {ListItems.map((item, i) => (
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
      ))}
    </ul>
  );
};

export default ListItem;
