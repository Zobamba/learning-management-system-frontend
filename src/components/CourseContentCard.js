import React from "react";

const CourseContentCard = ({
  course,
  content,
  progress,
  handleUpdateProgress,
}) => {
  const isCompleted = progress?.some(
    (p) =>
      p.course_id === course._id && p.completed_chapters.includes(content._id)
  );

  return (
    <div className="rounded-xl shadow-lg overflow-hidden bg-gray-100 border border-gray-200 flex flex-col transform transition duration-300 hover:shadow-xl hover:scale-105">
      <div
        className={`border rounded-md p-3 shadow-sm ${
          isCompleted ? "bg-green-100" : ""
        }`}
      >
        <p className="text-sm font-medium text-gray-700">{content.chapter}</p>
        <p className="text-sm text-[#891C69]">
          <a href={content.video_url} target="_blank" rel="noopener noreferrer">
            Video
          </a>
        </p>
        <p className="text-sm text-gray-600">Quiz: {content.quiz}</p>
        <button
          onClick={() => handleUpdateProgress(course._id, content._id)}
          className={`mt-2 text-sm px-2 py-1 border border-[#891C69] rounded-md 
    ${isCompleted ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-200"}`}
          disabled={isCompleted}
        >
          {isCompleted ? "Completed" : "Mark as Completed"}
        </button>
      </div>
    </div>
  );
};

export default CourseContentCard;
