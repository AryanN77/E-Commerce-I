import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context.jsx";
import { useCookies } from "react-cookie";
import { ThemeContext } from "../context/theme-context.jsx";
const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const name = localStorage.getItem("name");
  const handleLogout = (e) => {
    setIsAuthenticated(false);
    navigate("/shop");
  };
  return (
    <div className="flex justify-between p-3 bg-[#232b2b] dark:bg-[#082040] text-[#fff] z-10 sticky top-0 ">
      <div className="">
        <Link to="/" className="mr-3">
          Home
        </Link>
        <Link to="/shop" className="mr-3">
          Shop
        </Link>
        <Link to="/mycart" className="mr-3">
          My Cart
        </Link>
      </div>
      <div className="flex">
        <p>Logo</p>
        <button
          className="mx-2"
          onClick={() => {
            toggleTheme();
          }}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="">
        {isAuthenticated ? (
          <>
            <Link to="/user" className="mx-2">
              {name}
            </Link>
            <Link to="/auth" className="mx-2" onClick={handleLogout}>
              Log Out
            </Link>
          </>
        ) : (
          <Link to="/auth" className="mr-3">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
