import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from './Login';
import { UserContext } from '../Context/User';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Protected = () => {
  const { userName, setUserName, headers , sessionToken} = useContext(UserContext);
  const [ok, setOk] = useState(false);

  const checkAuth = async () => {
    try {
      // const res = await axios.get("http://localhost:8000/auth", { headers });

       if(sessionToken) {setOk(true);}
       else setOk(false);
    } catch (error) {
      setOk(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [ok]);
  return (
    <>
      {ok ? <Outlet /> : <Spinner ok={ok} />}
    </>
  );
};

export default Protected;
