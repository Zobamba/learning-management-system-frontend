import React from "react";
import { Link } from "react-router-dom";

const LoginSIgnUp = ({ closeModal }) => {
  const token = localStorage.getItem("token");

  const logOut = (e) => {
    e.preventDefault();
    const itemsToRemove = ["token", "userId"];
    itemsToRemove.forEach((item) => localStorage.removeItem(item));
    closeModal();
    window.location.reload();
  };
  return (
    <div
      className="flex flex-col items-center justify-center fixed inset-0 w-full h-full bg-black bg-opacity-50 z-[999]"
      onClick={closeModal}
    >
      <div
        className="absolute top-[10%] right-[5%] flex flex-col space-y-2 p-4 rounded-md bg-gray-100 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {!token && (
          <>
            <Link
              className="flex items-center justify-center h-[2.3rem] w-[13rem] rounded-md bg-gray-200 hover:bg-gray-300 text-[#891C69] font-medium text-[15px] font-montserrat leading-[1.295rem] text-center"
              to="/login"
            >
              LOGIN
            </Link>
            <Link
              className="flex items-center justify-center h-[2.3rem] w-[13rem] rounded-md bg-[#891C69] hover:bg-[#6e1455] text-white font-medium text-[15px] font-montserrat leading-[1.295rem] text-center"
              to="/register"
            >
              SIGNUP
            </Link>
          </>
        )}
        <Link
          className="flex items-center justify-center h-[2.3rem] w-[13rem] rounded-md bg-gray-200 hover:bg-gray-300] text-[#891C69] font-medium text-[15px] font-montserrat leading-[1.295rem] text-center"
          to="/admin"
        >
          VISIT ADMIN PANEL
        </Link>
        <Link
          className="flex items-center justify-center h-[2.3rem] w-[13rem] rounded-md bg-[#891C69] hover:bg-[#6e1455] text-white font-medium text-[15px] font-montserrat leading-[1.295rem] text-center"
          to="/courses"
        >
          TOP RATED COURSES ⭐️
        </Link>
        {token && (
          <>
            <button
              onClick={logOut}
              className="flex items-center justify-center h-[2.3rem] w-[13rem] rounded-md bg-gray-200 hover:bg-gray-300 text-[#891C69] font-medium text-[15px] font-montserrat leading-[1.295rem] text-center"
            >
              LOGOUT
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSIgnUp;
