import React, { useContext } from "react";
import { UserContext } from "../Context/User";
import { Link } from "react-router-dom";
import { UserPhoto } from "../utils/common.util";

const Profile = () => {
  const { userName } = useContext(UserContext);
  return (
    <>
      {/* <div className="max-w-4xl flex  items-center flex-wrap m-auto lg:my-10">
       
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  `url(${UserPhoto})`,
              }}
            />
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userName}</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-600 opacity-25" />
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <i className="fa-solid fa-user pe-3"></i> Follower : 30K
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <i className="fa-regular fa-images pe-3"></i> Post : 30
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <i className="fa-solid fa-heart pe-3"></i> Like : 700K
            </p>
            <p className="py-5 text-sm">
              Totally optional short description about yourself, what you do and
              so on.
            </p>

            <div className="flex items-center">
              <button className="w-[40%] bg-slate-700 hover:bg-slate-900 text-white font-bold rounded-sxl h-1/4 rounded-xl py-2">
                Follow
              </button>

              <div className="share w-[80%] ">
                <span className="">Share</span>
                <nav className="w-full scale-75 ">
                  <Link to="/" >
                    <i className="fa-brands fa-twitter" />
                  </Link>
                  <Link to="/">
                    <i className="fa-brands fa-facebook-f" />
                  </Link>
                  <Link to="/">
                    <i className="fa-brands fa-google" />
                  </Link>
                  <Link to="/">
                    <i className="fa-brands fa-github" />
                  </Link>
                </nav>
              </div>

            </div>
          </div>
        </div>
        <div className="w-full lg:w-[36%]">
          <img
            src={`url(${UserPhoto})`}
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          />
        </div>
      </div> */}
     < div className="">
      <div className="w-9/12 m-auto  mt-10 flex items-center justify-center">
        <div className="bg-slate-100 shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-purple-400 w-full h-32"><img className="w-full h-full object-contain" src="   https://cdn-icons-png.flaticon.com/512/1680/1680012.png " alt="" /></h1>
            <h1 className="text-6xl font-medium py-8">Oops! Page in  maintenance</h1>
            <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted or On maintenance.</p>
            <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
             <Link to="/">Home</Link>
            </button>
         
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
