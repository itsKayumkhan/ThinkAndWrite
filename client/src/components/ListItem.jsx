import axios from "axios";
import React, { useContext, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/User";

const ListItem = () => {
  const ListItems = ["All", "Music", "Movies", "Sports", "Tech", "Fashion"];
  const { post, setPost } = useContext(UserContext);
  const [searchParams] = useSearchParams(); // Invoke useSearchParams

  const category = searchParams.get("category");
  const filterCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/post/${category}`);
      setPost(res.data.posts);
    } catch (error) {
      console.log(error);
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
      {ListItems.map((item, i) => (
        <li
          key={i}
          className="px-4 text-xl font-medium cursor-pointer shadow-white text-black"
        >
          <NavLink to={`/?category=${item}`} className="hover:text-blue-500">
            {item}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
