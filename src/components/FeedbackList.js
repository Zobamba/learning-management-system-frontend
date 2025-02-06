import React from "react";

const FeedbackList = ({ feedbackList, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96 max-h-[80%] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Student Feedback</h2>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        {feedbackList.length === 0 ? (
          <p>No feedback yet. Be the first to submit feedback!</p>
        ) : (
          <div className="space-y-4">
            {feedbackList.map((feedback, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded shadow-md">
                <p className="text-sm mb-2">{feedback.feedback}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < feedback.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
