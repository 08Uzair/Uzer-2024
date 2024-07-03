import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setUserData(profile?.admins[0]);
    console.log(userData);
  }, []);
  return (
    <div style={{ width: "85%", height: "100vh", marginTop: "-3rem" }}>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
            <div className="relative bottom-8">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 ">
                <img className="rounded-full" src={userData?.avatar} />
              </div>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {userData?.fname} {userData?.lname}
            </h1>
            <p className="font-light text-gray-600 mt-3">{userData?.email}</p>
            <p className="mt-8 text-gray-500">ADMIN</p>
            <p className="mt-2 text-gray-500"> Country : {userData?.country}</p>
          </div>
          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>
            <button className="text-indigo-500 py-2 px-4 font-medium mt-4">
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
