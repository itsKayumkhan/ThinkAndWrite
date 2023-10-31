import React from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

const Error = () => {
  toast.error("Page is not found please go back");

  return (
    <>
       <div className="">
  <div className="w-9/12 m-auto  mt-10 flex items-center justify-center">
    <div className="bg-slate-100 shadow overflow-hidden sm:rounded-lg pb-8">
      <div className="border-t border-gray-200 text-center pt-8">
        <h1 className="text-9xl font-bold text-purple-400">404</h1>
        <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
        <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
        <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
         <Link to="/">Home</Link>
        </button>
     
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Error
