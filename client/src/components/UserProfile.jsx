import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const user = {
    avatar: userData?.avatar,
    fname: userData?.fname,
    lname: userData?.lname,
    country: userData?.country,
    state: userData?.state,
    city: userData?.city,
    pinCode: userData?.pinCode,
    email: userData?.email,
    number: userData?.number,
    address1: userData?.address1,
    address2: userData?.address2,
    role: userData?.role,
    createdAt: userData?.createdAt,
  };

  return (
    <>
      <Navbar />

      <div className="h-[87vh] overflow-y-hidden flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4 py-10">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-10 text-center flex flex-col items-center">
          <img
            src={
              user?.avatar ||
              "https://tse3.mm.bing.net/th?id=OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa&pid=Api&P=0&h=220"
            }
            alt="Avatar"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow -mt-20 object-cover bg-gray-200"
          />

          <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-800">
            {user?.fname} {user?.lname}
          </h2>
          <p className="text-gray-500 mt-1 flex items-center justify-center gap-1 text-sm">
            <i className="bx bx-map text-lg"></i>
            {user?.city}, {user?.state}, {user?.country}
          </p>
          <p className="mt-1 text-sm text-gray-600">{user?.role}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
            <div className="p-4 bg-[#0000000f] border-[0.1px] border-gray-100 rounded-lg shadow">
              <h4 className="font-medium text-gray-700">Email</h4>
              <p className="text-gray-600 mt-1">{user?.email}</p>
            </div>
            <div className="p-4 bg-[#0000000f] border-[0.1px] border-gray-100 rounded-lg shadow">
              <h4 className="font-medium text-gray-700">Phone</h4>
              <p className="text-gray-600 mt-1">{user?.number || "N/A"}</p>
            </div>
            <div className="p-4 bg-[#0000000f] border-[0.1px] border-gray-100 rounded-lg shadow">
              <h4 className="font-medium text-gray-700">Address</h4>
              <p className="text-gray-600 mt-1">{user?.address1 || "N/A"}</p>
            </div>
            <div className="p-4 bg-[#0000000f] border-[0.1px] border-gray-100 rounded-lg shadow">
              <h4 className="font-medium text-gray-700">Pincode</h4>
              <p className="text-gray-600 mt-1">{user?.pinCode || "N/A"}</p>
            </div>
          </div>

          <p className="mt-8 text-gray-700 leading-relaxed text-[15px] text-center max-w-2xl">
            A successful e-commerce site isn't just about selling products—it's
            about creating a seamless, engaging shopping experience.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <NavLink
              to="/"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition text-sm font-medium"
            >
              Back to Home
            </NavLink>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
