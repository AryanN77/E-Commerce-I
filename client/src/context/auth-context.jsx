import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const initialVal = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
};

export const AuthContext = createContext(initialVal);

export const AuthContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const [isAuthenticated, setIsAuthenticated] = useState(
    cookies.access_token !== null
  );
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setCookies("access_token", null);
      localStorage.removeItem("userID");
      localStorage.removeItem("name");
    }
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
