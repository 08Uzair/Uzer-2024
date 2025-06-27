import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Success = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="w-full h-screen bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/*Left - Image Section */}
        <div className="hidden md:flex w-1/2 h-full  flex-col items-center justify-center bg-blue-700 ">
          <img
            src="https://res.cloudinary.com/dyphiefiy/image/upload/v1750944192/5791986_d0ky1o.webp"
            alt="Order Confirmed"
            className="w-[60%] h-auto"
          />
          <h1 className="text-3xl font-bold text-center text-gray-100 p-2 border-2 border-gray-200 bg-[#ffffff1c] rounded-[50px]">ORDER PLACED SUCESSFULLY</h1>
        </div>
        {/* Right - Message Section */}
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-8 text-center bg-[#f7f7f7]">
          <img
            src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif"
            alt="Success"
            className="w-[40%] mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-4">
            Order Placed!
          </h1>
          <p className="text-gray-600 mb-8 px-4">
            Thank you, {userData?.fname || "User"}! <br />
            Your products will be shipped to your address shortly.
          </p>
          <div className="flex gap-4">
            <NavLink
              to="/"
              className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg shadow"
            >
              Home
            </NavLink>
            <NavLink
              to="/allProducts"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
            >
              Continue Shopping
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
