import React, { useState } from "react";
import LoginSIgnUp from "./LoginSignUp";
import Header from "./Header";
import Footer from "./Footer";
import arrows from "../assets/arrows.svg";

const AboutUs = () => {
  const [loginSignUp, setLoginSignUp] = useState(false);

  const closeModal = () => {
    setLoginSignUp(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        loginSignUp={loginSignUp}
        setLoginSignUp={setLoginSignUp}
        selectedLink="about"
        getStarted={true}
      />
      {loginSignUp && <LoginSIgnUp closeModal={closeModal} />}

      <div className="flex-1 flex flex-col justify-center items-center space-y-6 px-4 mt-8 mb-8 w-[90%] max-w-screen-xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-snug">
            Empower Your Future Through Learning
            <span className="text-[#891C69]"> Anytime, Anywhere 🚀</span>
          </h1>
        </div>
        <div className="text-center">
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
            Welcome to your personalized gateway to knowledge and growth! With a
            diverse selection of expertly designed courses, our platform is here
            to guide you on your journey to mastering new skills and achieving
            your career goals. Whether you're upskilling for the future or
            pursuing your passions, we’ve got you covered.
          </p>
        </div>
        <div className="text-center">
          <p className="text-[#891C69] text-sm sm:text-base">
            Ready to elevate your potential? Join thousands of learners who are
            transforming their lives—one course at a time.
          </p>
        </div>
        <div className="flex flex-col items-center px-6 py-4 border border-[#891C69] rounded-full w-full sm:w-1/3">
          <div className="flex items-center justify-between space-x-4 w-full">
            <h6 className="text-[#891C69] font-semibold uppercase text-sm sm:text-base">
              Explore
            </h6>
            <img
              src={arrows}
              alt="Arrow Icon"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-8 flex flex-col justify-center items-center space-y-6 px-4 mt-8 mb-8 w-[90%] max-w-screen-xl mx-auto">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
            What Our Learners Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-gray-800 italic">
                "This platform has completely transformed my learning
                experience. The courses are engaging, and I’ve gained skills
                that helped me land my dream job!"
              </p>
              <p className="mt-4 text-gray-600 font-semibold">- Jane Doe</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-gray-800 italic">
                "The flexibility and quality of the courses are unmatched. I
                love how I can learn at my own pace and revisit lessons whenever
                I need."
              </p>
              <p className="mt-4 text-gray-600 font-semibold">- John Smith</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-gray-800 italic">
                "Joining this platform was the best decision I made this year.
                The content is top-notch, and I’ve already started seeing
                results!"
              </p>
              <p className="mt-4 text-gray-600 font-semibold">- Emily White</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-gray-800 italic">
                "From the user-friendly interface to the amazing community
                support, this platform has exceeded all my expectations."
              </p>
              <p className="mt-4 text-gray-600 font-semibold">- Michael Lee</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
