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

const App = () => {
  return (
    <>
     <BrowserRouter>
     <Toaster/>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route path="*" element={<Error/>}/>

      
     </Routes>
     </BrowserRouter>
    </>
  );
};

export default App;
