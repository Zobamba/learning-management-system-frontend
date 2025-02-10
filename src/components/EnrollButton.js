import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const EnrollButton = ({ courseId, studentsEnrolled }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (studentsEnrolled.includes(userId)) {
      setIsEnrolled(true);
    }
  }, [studentsEnrolled, userId]);

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        `/api/course/${courseId}/enroll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsEnrolled(true);
      setSuccessMsg(response.data.message);
      setErrMsg("");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Error enrolling in course");
      setSuccessMsg("");
    }
  };

  return (
    <div>
      {errMsg && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{errMsg}</div>
      )}
      {successMsg && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {successMsg}
        </div>
      )}
      <button
        onClick={handleEnroll}
        disabled={isEnrolled}
        className={`px-2 py-1 rounded ${
          isEnrolled ? "bg-gray-500 cursor-not-allowed" : "bg-[#891C69] hover:bg-[#6e1455]"
        } text-white`}
      >
        {isEnrolled ? "Enrolled" : "Enroll Now"}
      </button>
    </div>
  );
};

export default EnrollButton;
