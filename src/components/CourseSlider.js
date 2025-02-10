import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const CourseSlider = ({ courses, loading }) => {
  const sliderRef = useRef();

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide p-4"
        ref={sliderRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[23rem]">
                <CourseCard loading={true} />
              </div>
            ))
          : courses.map((course) => (
              <div key={course._id} className="flex-shrink-0 w-[23rem]">
                <CourseCard
                  title={course.title}
                  description={course.description}
                  image={course.image}
                  rating={course.rating}
                  courseId={course._id}
                  loading={false}
                />
              </div>
            ))}
      </div>

      {courses.length > 3 && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="flex justify-center mt-4">
        <Link
          to="/courses"
          className="px-6 py-2 bg-[#891C69] text-white rounded-md hover:bg-[#974D7B]"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default CourseSlider;
