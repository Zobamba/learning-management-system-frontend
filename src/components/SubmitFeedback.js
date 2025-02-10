import React, { useState } from "react";
import axios from "../api/axios";

const SubmitFeedback = ({ courseId, closeModal }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/feedback/${courseId}/submit`,
        { feedback, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if(response) {
        setSuccessMsg("Feedback submitted successfully!");
        setErrMsg("");
        setFeedback("");
        setRating(0);

        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Error submitting feedback");
      setSuccessMsg("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Submit Your Feedback</h2>
        {errMsg && <p className="text-red-500 text-sm mb-2">{errMsg}</p>}
        {successMsg && (
          <p className="text-green-500 text-sm mb-2">{successMsg}</p>
        )}
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex items-center mb-4">
          <label className="mr-2">Rating:</label>
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              className={`text-2xl ${
                i < rating ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => setRating(i + 1)}
            >
              ★
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#891C69] text-white rounded hover:bg-[#6e1455]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedback;
