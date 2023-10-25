import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Login from './Login'
import { UserContext } from '../Context/User'

const Protected = () => {
const {userName} = useContext(UserContext)
console.log(userName)
  return (
    <>
      {
        userName ? <Outlet/> : <Login/>
      }
    </>
  )
}

export default Protected
