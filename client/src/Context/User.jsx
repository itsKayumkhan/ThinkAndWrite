import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserNameProvider = ({ children }) => {
  const session = sessionStorage.getItem("accessToken");
  const user = localStorage.getItem("userName")
  const [userName, setUserName] = useState(user);
  const [post, setPost] = useState();
  const [sessionToken, setSessionToken] = useState(session);
  const headers = {
    Authorization: sessionStorage.getItem("accessToken"),
  };
  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        post,
        setPost,
        headers,
        sessionToken,
        setSessionToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserNameProvider;
