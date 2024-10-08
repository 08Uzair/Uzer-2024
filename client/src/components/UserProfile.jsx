import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "tailwindcss/tailwind.css";
import "boxicons/css/boxicons.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);
  console.log(userData);
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
    friends: 22,
    photos: 10,
    comments: 89,
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: "17rem" }} className="profile-page ">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div>
                      <img
                        alt="..."
                        src={user.avatar}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 w-32"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 p-10 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {user.fname} {user.lname}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="bx bx-map mr-2 text-lg text-blueGray-400"></i>
                    {user.city}, {user.state}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="bx bx-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {user.role}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="bx bx-building mr-2 text-lg text-blueGray-400"></i>
                    {user.country}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        "A successful e-commerce site isn't just about selling
                        products—it's about creating a seamless, engaging
                        shopping experience. It’s intuitive, fast, and
                        personalized, balancing stunning visuals with top-notch
                        performance. The best sites know their audience, evolve
                        with feedback, and use technology to make shopping feel
                        effortless and enjoyable."
                      </p>
                      <NavLink to="/" className="font-normal text-pink-500">
                        Back
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserProfile;
