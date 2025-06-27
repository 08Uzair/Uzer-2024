import React, { useState } from "react";

export function Message() {
  const [openMessage, setOpenMessage] = useState(false);

  const handleOpen = () => setOpenMessage(!openMessage);

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Sign In
      </button>

      {openMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-blue-gray-900">Sign In</h4>
              <button
                onClick={handleOpen}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <p className="mb-4 text-gray-700">Enter your email and password to Sign In.</p>
            <form>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Your Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Your Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-2 rounded focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="text-gray-700">
                  Remember Me
                </label>
              </div>
              <button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4 text-center text-gray-700">
              Don't have an account?
              <a
                href="#signup"
                onClick={handleOpen}
                className="ml-1 font-bold text-blue-500 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
