import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const initialVal = {
  user: {},
  isAuthenticated: false,
  setIsAuthenticated: () => null,
};

export const AuthContext = createContext(initialVal);

export const AuthContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(
    cookies.access_token !== null
  );

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/user/${localStorage.getItem("userID")}`
      );
      if (res) {
        setUser(res.data);
      }
    } catch (error) {
      console.log("Some Error Occured ", error);
    }
  };
  const contextValue = {
    user,
    isAuthenticated,
    setIsAuthenticated,
    getUserDetails,
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
