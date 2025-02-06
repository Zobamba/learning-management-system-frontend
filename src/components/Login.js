import React from "react";
import axios from "../api/axios";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      navigate("/courses");
    } catch (err) {
      setErrMsg(err.response?.data?.message);
      errRef?.current?.focus();
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-6 text-[#891C69]">
        Login To Manage Your Courses
      </h1>
      <p
        ref={errRef}
        className={
          errMsg
            ? "text-firebrick font-bold text-xs w-2/3 text-center"
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
          className="w-full px-4 py-2 text-white bg-[#891C69] rounded-md hover:bg-[#974D7B]"
        >
          Submit
        </button>
        <div className="flex justify-between px-4">
          <p className="text-sm text-gray-500 ">Don't have an account?</p>
          <Link
            to={"/login"}
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
