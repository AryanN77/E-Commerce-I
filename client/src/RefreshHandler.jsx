import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth-context.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname == "/shop" || location.pathname == "/mycart") {
        navigate("/auth", { replace: false });
      }
    }
  }, [location, navigate, isAuthenticated]);
  return null;
};

export default RefreshHandler;
