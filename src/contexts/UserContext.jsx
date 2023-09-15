import { createContext, useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState({
    // name: userData?.name,
    // firstName: "",
    // lastName: "",
    id: userData?._id,
    email: userData?.email,
    token: userData?.token || "123",
  });
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
