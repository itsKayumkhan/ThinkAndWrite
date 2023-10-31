import React from "react";
import Navbar from "./components/Navbar";
import BlogCard from "./components/BlogCard";
import Profile from "./Pages/Profile";
import Contact from "./Pages/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { Toaster } from "react-hot-toast";
import Protected from "./Pages/Protected";
import CreateBlog from "./Pages/CreateBlog";
import "./App.css";
import BlogDetails from "./components/BlogDetails";
import UpdateBlog from "./Pages/UpdateBlog";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />

          <Route  element={<Protected />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/post/details/:_id" element={<BlogDetails />} />
            <Route path="/post/update/:_id" element={<UpdateBlog />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
