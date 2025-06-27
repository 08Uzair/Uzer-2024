import React, { useState, useEffect } from "react";
import Loader from "../utility/Loader";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setUserData(profile?.result);
  }, []);

  if (!userData) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-start w-[85%] h-screen bg-gray-50 overflow-y-auto">
      <div className="w-full max-w-4xl mt-12 p-8 bg-white shadow-xl rounded-lg">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-blue-100 rounded-full shadow-lg flex items-center justify-center overflow-hidden">
            {userData?.avatar ? (
              <img
                className="w-full h-full object-cover"
                src={userData.avatar}
                alt="User Avatar"
              />
            ) : (
              <span className="text-blue-600 font-bold text-xl">No Avatar</span>
            )}
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-800">
            {userData?.fname} {userData?.lname}
          </h1>
          <p className="text-gray-500 mt-2">{userData?.email}</p>
          <p className="mt-1 text-blue-600 font-semibold">ADMIN</p>
        </div>

        {/* Info Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Country</h3>
            <p className="text-lg font-medium text-gray-700 mt-1">
              {userData?.country || "N/A"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">State</h3>
            <p className="text-lg font-medium text-gray-700 mt-1">
              {userData?.state || "N/A"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">City</h3>
            <p className="text-lg font-medium text-gray-700 mt-1">
              {userData?.city || "N/A"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Pincode</h3>
            <p className="text-lg font-medium text-gray-700 mt-1">
              {userData?.pinCode || "N/A"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow col-span-1 md:col-span-2">
            <h3 className="text-sm text-gray-500">Address</h3>
            <p className="text-lg font-medium text-gray-700 mt-1">
              {userData?.address1 || ""} {userData?.address2 || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
