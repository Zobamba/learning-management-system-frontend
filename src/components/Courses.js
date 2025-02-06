import React from "react";
import axios from "../api/axios";
import { useEffect, useState, useRef } from "react";
import CreateCourse from "./CreateCourse";
import EnrollButton from "./EnrollButton";
import CourseProgress from "./CourseProgress";
import SubmitFeedback from "./SubmitFeedback";
import FeedbackList from "./FeedbackList";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSubmitFeedback, setShowSubmitFeedback] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [progress, setProgress] = useState([]);

  const { errRef, modalErrRef } = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, progressResponse] = await Promise.all([
          axios.get("/api/course/all", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`/api/course/progress`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setCourses(coursesResponse.data.data);
        setProgress(progressResponse.data.progress);
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Error fetching data");
        errRef?.current?.focus();
      }
    };

    fetchData();
  }, [errRef]);

  const fetchFeedbacks = async (courseId) => {
    try {
      const response = await axios.get(`/api/feedback/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFeedbackList(response.data.courseFeedbacks);
    } catch (err) {
      console.error(err.response?.data?.message || "Error fetching feedback");
    }
  };

  const handleCreateCourse = async (newCourse) => {
    try {
      const response = await axios.post(
        "/api/course",
        JSON.stringify(newCourse),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        setCourses((prevCourses) => [
          ...prevCourses,
          response.data.createdCourse,
        ]);
        setShowModal(false);
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message);
      modalErrRef?.current?.focus();
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
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      {showModal && (
        <CreateCourse
          onSubmit={handleCreateCourse}
          onClose={() => setShowModal(false)}
          errMsg={errMsg}
          errRef={modalErrRef}
        />
      )}

      <h1 className="text-2xl font-semibold mb-6 text-[#891C69]">
        Learning Management System
      </h1>

      <div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white bg-[#891C69] rounded-md hover:bg-[#974D7B]"
            onClick={() => setShowModal(true)}
          >
            Add New Course
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-4 text-[#891C69]">Courses</h2>
        <span className="text-sm text-gray-500">
          {errMsg && (
            <p className="text-red-700 font-bold text-xs w-2/3 text-center">
              {errMsg}
            </p>
          )}
        </span>
        <ul>
          {courses.map((course) => (
            <li
              key={course._id}
              className="mb-4 shadow-sm rounded-md bg-gray-50 p-6 sm:p-8 md:p-12"
            >
              {showSubmitFeedback && (
                <SubmitFeedback
                  courseId={course._id}
                  closeModal={() => setShowSubmitFeedback(false)}
                />
              )}
              {showFeedbacks && (
                <FeedbackList
                  feedbackList={feedbackList}
                  closeModal={() => setShowFeedbacks(false)}
                />
              )}

              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#891C69] mb-1">
                  {course.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  {course.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {course.content.map((content, index) => {
                  const isCompleted = progress?.find(
                    (p) =>
                      p.course_id === course._id &&
                      p.completed_chapters.includes(content._id)
                  );

                  return (
                    <div
                      key={index}
                      className={`border rounded-md p-3 shadow-sm ${
                        isCompleted ? "bg-green-100" : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-700">
                        {content.chapter}
                      </p>
                      <p className="text-sm text-[#891C69]">
                        <a
                          href={content.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Video
                        </a>
                      </p>
                      <p className="text-sm text-gray-600">
                        Quiz: {content.quiz}
                      </p>
                      <button
                        onClick={() =>
                          handleUpdateProgress(course._id, content._id)
                        }
                        className={`mt-2 text-sm px-2 py-1 border border-[#891C69] rounded-md ${
                          isCompleted
                            ? "bg-green-100 cursor-not-allowed"
                            : "text-[#891C69] hover:bg-[#974D7B]"
                        }`}
                        disabled={isCompleted}
                      >
                        {isCompleted ? "Completed" : "Mark as Completed"}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="w-full mt-4">
                <CourseProgress
                  progress={progress.find((p) => p.course_id === course._id)}
                />
              </div>

              <div className="mt-4">
                <EnrollButton
                  courseId={course._id}
                  studentsEnrolled={course.students_enrolled}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-4 mt-4">
                <button
                  onClick={() => setShowSubmitFeedback(true)}
                  className="w-full sm:w-auto mb-2 sm:mb-0 px-2 py-1 text-sm text-[#891C69] border border-[#891C69] rounded-md hover:bg-[#974D7B]"
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => {
                    setShowFeedbacks(true);
                    fetchFeedbacks(course._id);
                  }}
                  className="w-full sm:w-auto px-2 py-1 text-sm text-[#891C69] border border-[#891C69] rounded-md hover:bg-[#974D7B]"
                >
                  View Feedbacks
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Courses;
