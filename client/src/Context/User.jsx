import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserNameProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [post, setPost] = useState();

  return (
    <UserContext.Provider value={{ userName, setUserName,post,setPost }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserNameProvider;
