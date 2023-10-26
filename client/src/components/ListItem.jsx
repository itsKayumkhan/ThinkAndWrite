import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const ListItem = () => {
  const ListItems = ["All", "Music", "Movies", "Sports", "Tech", "Fashion"];

  const [searchParams] = useSearchParams(); // Invoke useSearchParams

  const category = searchParams.get("category");

  return (
    <ul className="flex mx-auto items-center justify-center mt-4 bg-white h-12">
      <li className="h-full bg-black flex items-center justify-center hover:scale-90 hover:rounded-md">
        <NavLink to={`/create?category=${category || ""}`} className="rounded text-white mx-3">
          Create Blog
        </NavLink>
      </li>
      {ListItems.map((item, i) => (
        <li key={i} className="px-4 text-xl font-medium cursor-pointer shadow-white text-black">
          <NavLink to={`/?category=${item}`} className="hover:text-blue-500">{item}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
