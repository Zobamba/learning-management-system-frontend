import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import CourseCard from "./CourseCard";
import Footer from "./Footer";
import LoginSIgnUp from "./LoginSignUp";
import CreateCourse from "./CreateCourse";
import axios from "../api/axios";
const AdminPanel = () => {
  const [loginSignUp, setLoginSignUp] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [errMsg, setErrMsg] = useState("");
  const [modalErrMsg, setModalErrMsg] = useState("");

  const { modalErrRef } = useRef();

  const { errRef } = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/course/all", {});

        if (response.data) {
          setCourses(response.data.data);
        }
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Error fetching data");
        errRef?.current?.focus();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [errRef]);

  const closeModal = () => {
    setLoginSignUp(false);
  };

  const filterCoursesByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        setModalErrMsg("");
      }
    } catch (err) {
      setModalErrMsg(err.response?.data?.message);
      modalErrRef?.current?.focus();
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <Header
        loginSignUp={loginSignUp}
        setLoginSignUp={setLoginSignUp}
        selectedLink="home"
        getStarted={false}
      />

      {loginSignUp && <LoginSIgnUp closeModal={closeModal} />}

      {showModal && (
        <CreateCourse
          onSubmit={handleCreateCourse}
          onClose={() => setShowModal(false)}
          errMsg={modalErrMsg}
          errRef={modalErrRef}
        />
      )}

      <div className="flex w-full justify-end pr-8 mt-6">
        <button
          className="px-4 py-2 bg-[#891C69] text-white rounded-md hover:bg-[#6e1455]"
          onClick={() => setShowModal(true)}
        >
          Create Course
        </button>
      </div>

      <div className="relative w-[80%] sm:w-[50%] mx-auto mt-4">
        <input
          type="text"
          placeholder="Search courses by title or description..."
          className="w-full px-10 py-2 rounded-md text-gray-700 border border-[#891C69]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-3 justify-center my-6">
        {["All", "Technology", "Business", "Art", "Health"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category
                ? "bg-[#891C69] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#891C69] hover:text-white"
            }`}
            onClick={() => filterCoursesByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <span className="w-full text-sm text-gray-500">
        {errMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errMsg}
          </div>
        )}
      </span>

      <div className="w-[90%] text-start my-4">
        {filteredCourses.length > 0 ? (
          <h2 className="text-xl font-semibold text-[#891C69]">
            {`Total Courses: ${filteredCourses.length}`}
          </h2>
        ) : (
          <h2 className="text-xl font-semibold text-[#891C69]">
            {`Total Courses: 0`}
          </h2>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] mb-8 ">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              title={course.title}
              description={course.description}
              image={course.image}
              rating={course.rating}
              courseId={course._id}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminPanel;
