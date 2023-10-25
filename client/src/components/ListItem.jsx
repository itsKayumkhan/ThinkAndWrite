import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const ListItem = () => {
  const ListItems = ["All", "Music", "Movies", "Sports", "Tech", "Fashion"];

  const [searchParams] = useSearchParams(); // Invoke useSearchParams

  const category = searchParams.get("category");

  return (
    <ul className="flex mx-auto items-center justify-center mt-4 bg-white p-3">
      <li>
        <NavLink to={`/create?category=${category || ""}`} className="px-2 py-2 rounded text-white me-10 bg-slate-900">
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
