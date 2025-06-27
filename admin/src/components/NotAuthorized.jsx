import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      
      {/* SVG Illustration */}
      <div className="mb-6">
        <svg
          className="w-64 h-64"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="256" cy="256" r="256" fill="#F87171" />
          <path
            d="M336 176L176 336M176 176L336 336"
            stroke="white"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          403 - Not Authorized
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>

        {/* Action Buttons */}
        <div className="space-x-4">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Login Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Uzer
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
