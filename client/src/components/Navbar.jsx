import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/User";
import { UserPhoto } from "../utils/common.util";
import toast from "react-hot-toast";

const Navbar = () => {
  const [userIconClick, setUserIconClick] = useState(false);
  const [toggleNavBar, setToggleNavBar] = useState(false);

  const { userName, setUserName, sessionToken, setSessionToken } =
    useContext(UserContext);
  const navigate = useNavigate();
  const handelSignOut = () => {
    localStorage.removeItem("userName");
    sessionStorage.clear();
    setUserName(null);
    setSessionToken(false);
    setUserIconClick(!userIconClick);
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-5 md:h-8 mr-1 md:mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              ThinkAndWrite
            </span>
          </NavLink>
          <div className="flex items-center md:order-2 relative">
            {sessionToken ? (
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 "
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                (
                <div className="w-8 h-8 outline-none rounded-full bg-white">
                  <img
                    className="h-full rounded-full w-full  object-cover"
                    src={UserPhoto}
                    alt="user photo"
                    onClick={() => {
                      setUserIconClick(!userIconClick);
                    }}
                  />
                </div>
                ){" "}
              </button>
            ) : (
             <ul className="flex items-center justify-center gap-46">
               <li className="">
                <Link to="/login" className="text-xl hover:scale-90">
                  Login
                </Link>
              </li>
              <li className="">
                <Link to="/signup" className="text-xl hover:scale-90">
                  Sign Up
                </Link>
              </li>
             </ul>
            )}

            {/* Dropdown menu */}
            {userIconClick && (
              <div
                className="z-50  my-4 py-3  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-8 right-3 w-32 text-center "
                id="user-dropdown"
              >
                <div className="py-2 px-0">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {userName}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {userName}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/login"
                      onClick={handelSignOut}
                      className="flex items-center justify-center hover:scale-90"
                      id="signOut"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              onClick={() => setToggleNavBar(!toggleNavBar)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              toggleNavBar ? "hidden" : ""
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            {!sessionToken ? (
              ""
            ) : (
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className="my-3">
                  <NavLink
                    to="/"
                    className="px-2 py-2 rounded text-white"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/profile"
                    className="px-2 py-2 rounded text-white"
                  >
                    Profile
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to="/create-blog" className="px-2 py-2 rounded text-white">
                    Create Blog
                  </NavLink>
                </li> */}
                <li className="my-3">
                  <NavLink
                    to="/contact"
                    className="px-2 py-2 rounded text-white"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
