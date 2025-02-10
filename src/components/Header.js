import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Header = ({ loginSignUp, setLoginSignUp, selectedLink, getStarted }) => {
  return (
    <header className="w-full flex justify-evenly items-center mb-8 pb-4 shadow-sm">
      <div className="flex items-center justify-between w-[90%]">
        <div className="text-left">
          <Link to={"/"}>
            <h2 className="text-[#891C69] font-bold text-xl leading-[2.45rem] font-montserrat m-0">
              LEARN <span className="text-gray-800">AXIS</span>
            </h2>
          </Link>
        </div>

        <div className="px-2">
          <nav>
            <ul className="flex items-center justify-between list-none h-8 w-full bg-gray-100 rounded-[1.625rem] p-0">
              <li
                className={`flex items-center justify-center h-8 rounded-[1.625rem] ${
                  selectedLink === "home" ? "bg-[#891C69]" : ""
                } w-[4.25rem]`}
              >
                <Link
                  to="/"
                  className={`${
                    selectedLink === "home" ? "text-white" : "text-[#891C69]"
                  } text-[12px] font-medium font-montserrat leading-[14.64px] text-center no-underline flex items-center justify-center h-full w-full`}
                >
                  Home
                </Link>
              </li>
              <li
                className={`flex items-center justify-center h-8 rounded-[1.625rem] ${
                  selectedLink === "about" ? "bg-[#891C69]" : ""
                } w-[5.4375rem]`}
              >
                <Link
                  to="/about-us"
                  className={`${
                    selectedLink === "about" ? "text-white" : "text-[#891C69]"
                  } text-[12px] font-medium font-montserrat leading-[14.64px] text-center no-underline flex items-center justify-center h-full w-full`}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {getStarted ? (
          <div className="flex justify-end items-center h-[2.3rem] w-[15%]">
            <button
              onClick={() => setLoginSignUp(!loginSignUp)}
              className="flex items-center justify-center h-auto w-[2.3rem] rounded-[0.5rem] p-[4px] bg-[#891C69] hover:bg-[#6e1455] text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {loginSignUp ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[2.3rem] w-[15%] bg-transparent"></div>
        )}
      </div>
    </header>
  );
};

export default Header;
