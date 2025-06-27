import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
        </div>
        <p className="text-gray-700 font-medium text-lg animate-pulse">
          Loading<span className="animate-bounce">...</span>
        </p>
      </div>
    </div>
  );
};

export default Loader;
