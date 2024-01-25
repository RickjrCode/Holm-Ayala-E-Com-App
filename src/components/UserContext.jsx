import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const setAndStoreToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ token, setToken: setAndStoreToken, clearToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
