import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserNameProvider = ({ children }) => {
  const [userName, setUserName] = useState("kayumkhan");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserNameProvider;