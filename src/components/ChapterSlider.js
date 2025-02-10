import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseContentCard from "./CourseContentCard";

const ChapterSlider = ({ course, progress, handleUpdateProgress }) => {
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
        {course.content.map((content) => (
          <div key={content._id} className="flex-shrink-0 w-[23rem]">
            <CourseContentCard
              course={course}
              content={content}
              progress={progress}
              handleUpdateProgress={handleUpdateProgress}
            />
          </div>
        ))}
      </div>

      {course.content.length > 2 && (
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
    </div>
  );
};

export default ChapterSlider;
