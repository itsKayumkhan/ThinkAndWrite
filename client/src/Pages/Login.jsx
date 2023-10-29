import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { UserContext } from "../Context/User";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const {setUserName} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const letsLogin = async (e) => {
    e.preventDefault(); // Fix the typo here

    try {
      const res = await axios.post("http://localhost:8000/login", user);
      if (res.data.success) {
        toast.success(res.data.message);
        sessionStorage.setItem("accessToken",`Bearer ${res.data.accessToken}`);
        sessionStorage.setItem("refreshToken",`Bearer ${res.data.refreshToken}`);
        setUserName(res.data.name)
        navigate("/"); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <div className="w-1/3 hidden lg:block">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8662/8662284.png"
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="bg-slate-400 rounded p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-900 font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={(e) => handleLogin(e)}
                id="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-slate-900"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-slate-900 font-medium">
                Password
              </label>
              <input
                type="password"
                value={user.password}
                onChange={(e) => handleLogin(e)}
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-slate-900"
                autoComplete="off"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-slate-800"
              />
              <label htmlFor="remember" className="text-slate-900 font-medium ml-2">
                Remember Me
              </label>
            </div>

            <div className="mb-6 text-slate-900 font-bold">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              onClick={(e) => letsLogin(e)}
              className="bg-slate-900 hover:bg-slate-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </div>

          <div className="mt-6 text-slate-800 text-center">
            <Link to="/signup" className="hover:underline">
              Sign up Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
