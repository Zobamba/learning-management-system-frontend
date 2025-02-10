import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({
  title,
  description,
  image,
  rating,
  courseId,
  loading,
}) => {
  if (loading) {
    return (
      <div className="rounded-xl shadow-lg overflow-hidden bg-gray-200 border border-gray-300 h-[23rem] w-[23rem] flex flex-col animate-pulse">
        <div className="relative bg-gray-300 h-48"></div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="w-6 h-6 bg-gray-300 rounded-full"></span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[23rem] rounded-xl shadow-lg overflow-hidden bg-white border border-gray-200 h-[23rem] flex flex-col transform transition duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-xl font-bold text-[#891C69] mb-2">
          <Link to={`/course/${courseId}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{description}</p>

        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xl ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
