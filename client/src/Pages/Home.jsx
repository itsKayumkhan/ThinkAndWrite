import React, { useContext } from "react";
import BlogCard from "../components/BlogCard";
import Banner from "../components/Banner";
import ListItem from "../components/ListItem";

const Home = () => {
  return (
    <div className="w-full min-h-screen mt-5">
      <Banner/>
      <ListItem/>
    </div>
  );
};

export default Home;
