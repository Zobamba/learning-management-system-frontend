const Intro = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 w-[90%] h-auto md:h-[20rem] max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center justify-center bg-gray-100 space-y-4 px-4 py-6 h-auto md:h-full w-full md:w-1/2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
            Explore Our Available Courses and Choose a
            <span className="text-[#891C69]"> Learning Path for Growth 🚀</span>
          </h1>
        </div>
        <div>
          <p className="text-gray-800 text-center md:text-left">
            Discover Your Next Learning Adventure. Choose from a wide range of
            courses to level up your skills!
          </p>
        </div>

        <div className="relative w-[90%] sm:w-[80%] md:w-[50%] mx-auto mt-4">
          <input
            type="text"
            placeholder="Search courses by title or description..."
            className="w-full px-10 py-2 rounded-md text-gray-700"
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

      <div className="h-[12rem] md:h-full w-full md:w-1/2 mt-4 md:mt-0">
        <img
          src="https://res.cloudinary.com/ddt4oo78m/image/upload/v1739203120/learn1_dlivth.jpg"
          alt="User Icon"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Intro;
