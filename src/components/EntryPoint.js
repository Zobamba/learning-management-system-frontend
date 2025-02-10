import { useEffect, useState, useRef } from "react";
import CourseSlider from "./CourseSlider";
import axios from "../api/axios";
import Header from "./Header";
import Intro from "./Intro";
import Footer from "./Footer";
import LoginSIgnUp from "./LoginSignUp";
const EntryPoint = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loginSignUp, setLoginSignUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { errRef } = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/course/all", {});

        if (response.data) {
          setCourses(response.data.data);
        }
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Error fetching data");
        errRef?.current?.focus();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [errRef]);

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

      <Intro searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="w-[90%]">
        <h2 className="text-3xl font-semibold mb-8 text-[#891C69]">
          Checkout Our Courses
        </h2>
        <div className="flex flex-wrap gap-3 justify-center my-6">
          {["All", "Technology", "Business", "Art", "Health"].map(
            (category) => (
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
            )
          )}
        </div>

        <span className="text-sm text-gray-500">
          {errMsg && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {errMsg}
            </div>
          )}
        </span>
        <div className="mb-8">
          <CourseSlider courses={filteredCourses} loading={loading} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EntryPoint;
