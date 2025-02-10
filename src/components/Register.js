import React from "react";
import axios from "../api/axios";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [firsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        "/api/auth/register",
        JSON.stringify({
          first_name: firsName,
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      navigate("/login");
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
          Unlock your potential—sign up and start your journey today!
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="flex flex-col items-start w-full sm:w-auto">
            <label className="block text-sm font-medium text-[#891C69]">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firsName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border w-full px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
            />
          </div>

          <div className="flex flex-col items-start w-full sm:w-auto">
            <label className="block text-sm font-medium text-[#891C69]">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border w-full px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
            />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <label className="block text-sm font-medium text-[#891C69]">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
          />
        </div>

        <div className="relative flex flex-col items-start">
          <label className="block text-sm font-medium text-[#891C69]">
            Password
          </label>
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
            className="absolute right-4 top-1/2 transform -translate-y-1/8 text-sm text-[#891C69]"
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative flex flex-col items-start">
          <label className="block text-sm font-medium text-[#891C69]">
            Confirm Password
          </label>
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="border w-full px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute right-4 top-1/2 transform -translate-y-1/8 text-sm text-[#891C69]"
          >
            {confirmPasswordVisible ? "Hide" : "Show"}
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
          <p className="text-sm text-gray-500 ">Already have an account?</p>
          <Link
            to={"/login"}
            className="text-sm text-[#891C69] hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
