import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import axios from "../api/axios";
import EnrollButton from "./EnrollButton";
import CourseProgress from "./CourseProgress";
import SubmitFeedback from "./SubmitFeedback";
import FeedbackList from "./FeedbackList";
import ChapterSlider from "./ChapterSlider";
import LoginSIgnUp from "./LoginSignUp";
import Footer from "./Footer";

const Course = () => {
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [showSubmitFeedback, setShowSubmitFeedback] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loginSignUp, setLoginSignUp] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { errRef } = useRef();

  useEffect(() => {
    const courseId = window.location.pathname.split("/").pop();

    if (courseId) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`/api/course/${courseId}`);
          return response.data.data;
        } catch (err) {
          setErrMsg(err.response?.data?.message || "Error fetching course");
          throw err;
        }
      };

      const fetchFeedbacks = async () => {
        try {
          const response = await axios.get(`/api/feedback/${courseId}`);
          return response.data.courseFeedbacks;
        } catch (err) {
          setErrMsg(err.response?.data?.message || "Error fetching feedback");
          errRef?.current?.focus();
          throw err;
        }
      };

      const fetchCourseProgress = async () => {
        try {
          const response = await axios.get(`/api/course/progress`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            withCredentials: true,
          });
          return response.data.progress;
        } catch (err) {
          setErrMsg(err.response?.data?.message || "Error fetching progress");
          throw err;
        }
      };

      const fetchData = async () => {
        setIsLoading(true);

        try {
          const token = localStorage.getItem("token");
          const promises = [fetchCourse(), fetchFeedbacks()];

          if (token) {
            promises.push(fetchCourseProgress());
          }

          const [courseData, feedbackData, progressData] = await Promise.all(
            promises
          );

          setCourse(courseData);
          setFeedbackList(feedbackData);

          if (token && progressData) {
            setProgress(progressData);
          }
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [errRef]);

  const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/api/auth/${userId}`);
      if (response.data.user) {
        return response.data.user;
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Error fetching user");
      errRef?.current?.focus();
    }
  };

  const handleUpdateProgress = async (courseId, chapterId) => {
    try {
      const response = await axios.patch(
        `/api/course/${courseId}/progress`,
        { chapterId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setProgress(response.data.progress);
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Error updating progress");
      errRef?.current?.focus();
    }
  };

  const closeModal = () => {
    setLoginSignUp(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Header
        loginSignUp={loginSignUp}
        setLoginSignUp={setLoginSignUp}
        selectedLink="home"
        getStarted={true}
      />

      {loginSignUp && <LoginSIgnUp closeModal={closeModal} />}

      <div className="flex flex-col items-center justify-center mb-4 rounded-md py-6 sm:py-8 md:py-12 w-[90%] max-w-screen-xl mx-auto">
        {showSubmitFeedback && (
          <SubmitFeedback
            courseId={course._id}
            closeModal={() => setShowSubmitFeedback(false)}
          />
        )}

        {errMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {errMsg}
          </div>
        )}

        {isLoading ? (
          <div className="w-[100%] flex items-center justify-center mb-12 min-h-screen">
            <div className="flex items-center justify-center mb-64">
              <svg
                className="w-5 h-5 mr-2 animate-spin text-[#891C69]"
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
          </div>
        ) : (
          <div className="w-[100%]">
            {course && (
              <div className="">
                <div className="mb-4">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#891C69] text-center">
                    {course.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 text-center leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <ChapterSlider
                  course={course}
                  progress={progress}
                  handleUpdateProgress={handleUpdateProgress}
                  showSubmitFeedback={showSubmitFeedback}
                />

                <div className="w-full">
                  <CourseProgress
                    progress={progress?.find((p) => p.course_id === course._id)}
                  />
                </div>

                <div className="mt-4">
                  <EnrollButton
                    courseId={course._id}
                    studentsEnrolled={course.students_enrolled}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 px-4 space-y-4 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowSubmitFeedback(true)}
                      className="w-full sm:w-auto px-4 py-2 text-sm text-[#891C69] border border-[#891C69] rounded-md hover:bg-gray-100"
                    >
                      Submit Feedback
                    </button>
                    <button
                      onClick={() => {
                        setShowFeedbacks(true);
                      }}
                      className="w-full sm:w-auto px-4 py-2 text-sm text-[#891C69] border border-[#891C69] rounded-md hover:bg-gray-100"
                    >
                      View Feedbacks
                    </button>
                  </div>

                  <div className="flex items-center justify-center sm:justify-end">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg sm:text-xl ${
                          i < course.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {showFeedbacks && (
          <FeedbackList
            closeModal={() => setShowFeedbacks(false)}
            feedbackList={feedbackList}
            getUserDetails={getUserDetails}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Course;
