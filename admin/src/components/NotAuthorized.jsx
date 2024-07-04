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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          403 - Not Authorized
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <div>
          <button className="m-4" onClick={handleLogout}>
            <a
              href="/auth"
              className="inline-block px-6 py-3 text-white bg-gray-400 hover:bg-gray-500 rounded-lg border-slate-950"
            >
              Login
            </a>{" "}
          </button>

          <a
            href="/"
            className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Go to Uzer.
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
