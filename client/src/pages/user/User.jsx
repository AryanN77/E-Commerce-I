import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context.jsx";

function User() {
  const { getUserDetails, user } = useContext(AuthContext);
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex flex-1 ">
      <div className="flex-[0.35] flex bg-blue-300 dark:bg-[#2a2a51] justify-center items-center dark:border-r-2 border-white">
        <div className="border-4 border-white text-[#fff] w-[80%] flex flex-col items-start justify-center p-3 rounded-md">
          <p className="my-2 text-lg">
            <span className="font-bold text-xl">Customer Name:</span>{" "}
            {user.name}
          </p>
          <p className="my-2 text-lg">
            <span className="font-bold text-xl">Customer Email:</span>{" "}
            {user.email}
          </p>
          <p className="my-2 text-lg">
            <span className="font-bold text-xl">Current Balance:</span> $
            {user.balance}
          </p>
        </div>
      </div>
      <div className="flex-[0.65]"></div>
    </div>
  );
}

export default User;
