import React, { useContext, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context.jsx";
function Auth() {
  return (
    <div className="flex-1 flex justify-center items-center w-full h-full dark:text-[#DCDCDC] dark:bg-[#040f18]">
      <SignUp />
      <LogIn />
    </div>
  );
}

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user/signup", {
        name,
        email,
        password,
      });
      alert("Registration Successfull!!");
      setEmail("");
      setName("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col flex-1 w-full h-full justify-center items-center">
      <h1 className="text-md font-semibold">Register As A User!!</h1>
      <form
        onSubmit={handleSubmit}
        action="p-4 flex flex-col justify-center shadow-md h-[50%] w-full rounded-md border-lg border-"
      >
        <div className="flex flex-col items-start mt-2 mb-2">
          <label htmlFor="username">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="username"
            placeholder="Enter Your Name"
            className="rounded-md p-1 border border-3 border-[#000] focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col items-start mb-2 ">
          <label htmlFor="username">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter Your Email"
            className="rounded-md p-1 border border-3 border-[#000] focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col items-start mb-2">
          <label htmlFor="password">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Enter Password"
            className="rounded-md p-1 border border-3 border-[#000] focus:outline-blue-500"
          />
        </div>
        <button
          className="p-3 w-[45%] shadow-md rounded-md hover:bg-slate-100 dark:bg-[#180e53]"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
function LogIn() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });
      console.log(res);
      const name = await res.data.name.split(" ");
      setCookies("access_token", res.data.token);
      localStorage.setItem("userID", res.data.userID);
      setIsAuthenticated(true);
      localStorage.setItem("name", name[0]);
      alert("Logged In Successfully!!");
      setEmail("");
      setPassword("");
      navigate("/shop");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col flex-1 w-full h-full justify-center items-center">
      <h1 className="text-md font-semibold">Log In!!</h1>
      <form
        onSubmit={handleSubmit}
        action="p-4 flex flex-col justify-center shadow-md h-[50%] w-full rounded-md border-lg border-"
      >
        <div className="flex flex-col items-start mb-2 ">
          <label htmlFor="username">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter Your Email"
            className="rounded-md p-1 border border-3 border-[#000] focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col items-start mb-2">
          <label htmlFor="password">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Enter Password"
            className="rounded-md p-1 border border-3 border-[#000] focus:outline-blue-500"
          />
        </div>
        <button
          className="p-3 w-[45%] shadow-md rounded-md hover:bg-slate-100 dark:bg-[#180e53]"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Auth;
