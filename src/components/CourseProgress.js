const CourseProgress = ({ progress }) => {
  if (!progress) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 rounded-md">
        <svg
          className="h-16 w-16 text-[#891C69] mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 18a6 6 0 100-12 6 6 0 000 12z"
            fill="currentColor"
            className="opacity-50"
          />
          <path fill="currentColor" d="M11 7h2v5h-2zM11 15h2v2h-2z" />
        </svg>
        <p className="text-gray-700 text-lg text-center">
          You haven't started tracking progress for this course yet.
        </p>
        <p className="text-gray-600 text-sm text-center mt-2">
          Enroll in the course and start learning to track your progress!
        </p>
      </div>
    );
  }

  const {
    completed_chapters = [],
    total_chapters = 0,
    is_completed = false,
  } = progress;

  return (
    <div className="rounded-md p-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold mb-2">Course Progress</h3>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-[#891C69] h-4 rounded-full"
          style={{
            width: `${(completed_chapters.length / total_chapters) * 100}%`,
          }}
        ></div>
      </div>
      <p className="text-sm">
        {completed_chapters.length}/{total_chapters} Chapters Completed
      </p>

      <p className="mt-2 text-sm">
        Status:{" "}
        <span
          className={`font-bold ${
            is_completed ? "text-green-500" : "text-orange-500"
          }`}
        >
          {is_completed ? "Completed" : "In Progress"}
        </span>
      </p>
    </div>
  );
};

export default CourseProgress;
