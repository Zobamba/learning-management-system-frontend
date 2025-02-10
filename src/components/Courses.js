import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import CourseCard from "./CourseCard";
import Footer from "./Footer";
import LoginSIgnUp from "./LoginSignUp";
import axios from "../api/axios";

const Courses = () => {
  const [loginSignUp, setLoginSignUp] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const coursesPerPage = 6;

  const { errRef } = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/course/all", {});

        if (response.data) {
          setCourses(response.data.data);
          localStorage.setItem("courses", JSON.stringify(response.data.data));
        } else {
          const localData = localStorage.getItem("courses");
          if (localData) {
            setCourses(JSON.parse(localData));
          } else {
            setErrMsg("No courses found");
          }
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

  const filterCoursesByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

      <div className="w-full bg-gradient-to-r from-[#891C69] to-[#6e1455] text-white py-10 text-center w-[90%]">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">
          Discover Your Next Learning Adventure
        </h1>

        <p className="text-base sm:text-lg mb-6">
          Choose from a wide range of courses to level up your skills!
        </p>

        <div className="relative w-[90%] sm:w-[70%] md:w-[50%] mx-auto mt-4">
          <input
            type="text"
            placeholder="Search courses by title or description..."
            className="w-full px-10 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#891C69]"
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
      </div>

      <div className="flex flex-wrap gap-3 justify-center my-6 w-[90%]">
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

      <span className="text-sm text-gray-500">
        {errMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errMsg}
          </div>
        )}
      </span>

      <div className="w-[90%] text-center sm:text-start my-4 mx-auto">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
          {currentCourses.map((course) => (
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

      <div className="flex justify-center items-center gap-2 my-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-[#891C69] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#891C69] hover:text-white"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
