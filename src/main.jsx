import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const updateAuthentication = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", status.toString());
  };

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated: updateAuthentication }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
