import React, { useState } from "react";

const CreateCourse = ({ onSubmit, onClose, errRef, errMsg }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([
    { chapter: "", video_url: "", quiz: "" },
  ]);

  const handleAddContent = () => {
    setContent([...content, { chapter: "", video_url: "", quiz: "" }]);
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...content];
    updatedContent[index][field] = value;
    setContent(updatedContent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { title, description, content };
    onSubmit(newCourse);
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl max-h-[80%] p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-[#891C69]">
          Create New Course
        </h2>
        <div className="flex items-center justify-center">
          <p
            ref={errRef}
            className={
              errMsg
                ? "text-red-700 font-bold text-xs w-2/3 text-center"
                : "absolute left-[-9999px]"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium text-[#891C69]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block border w-full border-gray-50 px-4 py-1 rounded-md shadow-sm sm:text-sm text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
              placeholder="Enter course title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#891C69]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block border w-full border-gray-50 px-4 rounded-md shadow-sm sm:text-sm text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
              placeholder="Enter course description"
              rows={3}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#891C69]">
              Content
            </label>
            {content.map((item, index) => (
              <div
                key={index}
                className="border rounded-md p-4 mb-4 bg-gray-50"
              >
                <div className="mb-2">
                  <label className="block text-sm font-medium text-[#891C69]">
                    Chapter
                  </label>
                  <input
                    type="text"
                    value={item.chapter}
                    onChange={(e) =>
                      handleContentChange(index, "chapter", e.target.value)
                    }
                    className="mt-1 block border f w-full border-gray-50 rounded-md sm:text-sm text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
                    placeholder="Enter chapter name"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-[#891C69]">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={item.video_url}
                    onChange={(e) =>
                      handleContentChange(index, "video_url", e.target.value)
                    }
                    className="mt-1 block border f w-full border-gray-50 rounded-md sm:text-sm text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
                    placeholder="Enter video URL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#891C69]">
                    Quiz
                  </label>
                  <input
                    type="text"
                    value={item.quiz}
                    onChange={(e) =>
                      handleContentChange(index, "quiz", e.target.value)
                    }
                    className="mt-1 block border f w-full border-gray-50 rounded-md sm:text-sm text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-[#891C69]"
                    placeholder="Enter quiz question"
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddContent}
              className="text-[#891C69] hover:text-indigo-900 text-sm font-medium"
            >
              + Add More Content
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#891C69] text-white px-4 py-2 rounded-md hover:bg-[#974D7B]"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
