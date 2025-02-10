import React from "react";
import axios from "../api/axios";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userId", response?.data?.user._id);

      navigate("/");
    } catch (err) {
      setErrMsg(err.response?.data?.message);
      errRef?.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-[#891C69] font-bold text-xl leading-[2.45rem] font-montserrat m-0">
          LEARN <span className="text-gray-800">AXIS</span> 🚀
        </h2>
        <h3 className="text-sm text-gray-600">
          Login to your account to continue your learning
        </h3>
      </div>
      <p
        ref={errRef}
        className={
          errMsg
            ? "text-red-800 font-bold text-xs w-2/3 text-center"
            : "absolute left-[-9999px]"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 border w-full px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
        />
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-[#891C69]"
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white bg-[#891C69] rounded-md hover:bg-[#974D7B] ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : (
            "Submit"
          )}
        </button>
        <div className="flex justify-between px-4">
          <p className="text-sm text-gray-500 ">Don't have an account?</p>
          <Link
            to={"/register"}
            className="text-sm text-[#891C69] hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
