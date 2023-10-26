import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <>
     {/* component */}
<div className="bg-cover bg-center   text-white py-24 px-10 object-fill" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)'}}>
  <div className="md:w-1/2">
    <p className="font-bold text-sm uppercase">Services</p>
    <p className="text-3xl font-bold">Multimedia products</p>
    <p className="text-2xl mb-10 leading-none">Atractive designs for your brand</p>
    <Link to="/create" className="bg-slate-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:scale-75 hover:text-gray-800">Create Now</Link>
  </div>  
</div>

    </>
  )
}

export default Banner
