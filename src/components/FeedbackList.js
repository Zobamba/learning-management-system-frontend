import React, { useEffect, useState } from "react";
import userPlaceholder from "../assets/user-placeholder.jpg";

const FeedbackList = ({ closeModal, feedbackList, getUserDetails }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userMap = {};
      for (const feedback of feedbackList) {
        const user = await getUserDetails(feedback.user_id);
        userMap[feedback.user_id] = user;
      }
      setUsers(userMap);
    };

    fetchUserDetails();
  }, [feedbackList, getUserDetails]);

  return (
    <>
      <h2 className="text-3xl text-[#891C69] font-semibold mb-4 mt-8">
        What Our Students Say
      </h2>
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
          {feedbackList.map((feedback, index) => {
            const user = users[feedback.user_id];
            return (
              <div
                key={index}
                className=" flex items-center justify-between bg-gray-100 px-4 py-2 rounded shadow-md"
              >
                <div className="flex flex-col">
                  <div className="mt-2 flex items-center space-x-2">
                    <img
                      src={userPlaceholder}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    {user ? (
                      <div>
                        <p className="font-semibold">
                          {user.first_name + " " + user.last_name || "John Doe"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }).format(new Date(feedback.created_at))}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }).format(new Date(feedback.created_at))}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center mt-4">
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

                <div className="block">
                  <p className="text-sm">{feedback.feedback}</p>
                </div>

                <div></div>
              </div>
            );
          })}
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
    </>
  );
};

export default FeedbackList;
