import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartProductByUserID } from "../redux/actions/cart";
import { toast } from "react-toastify";
import { addInbox } from "../redux/actions/inbox";
import { TOAST } from "../utility/constantToast";

const Navbar = () => {
  const [openMessage, setOpenMessage] = useState(false);
  const [userData, setUserData] = useState();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const dispatch = useDispatch();
  const cartProductData = useSelector((state) => state?.cart);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
    setUser(profile?._id);
    setEmail(profile?.email);
  }, []);

  useEffect(() => {
    if (openMessage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMessage]);

  useEffect(() => {
    if (userData?._id) {
      dispatch(getCartProductByUserID(userData?._id));
    }
  }, [dispatch, userData]);

  const handleCreatePost = async () => {
    try {
      const newInbox = { email, message, user };
      await dispatch(addInbox(newInbox));
      toast.info(TOAST.INBOX.INFO_INBOX);
      setOpenMessage(false);
      setMessage("");
    } catch (error) {
      console.log(error);
      toast.error(TOAST.INBOX.ERROR_INBOX);
    }
  };

  const handleMessageToggle = () => setOpenMessage(!openMessage);

  const cartTotalPrice = cartProductData?.reduce((total, item) => {
    const price = parseFloat(item?.product?.price) || 0;
    const quantity = item?.quantity || 1;
    return total + price * quantity;
  }, 0);

  return (
    <>
      <header className="sticky top-4 m-4 rounded-2xl z-50 backdrop-blur-md border-2 border-gray-200 bg-[#f5f5f599] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          <NavLink to="/" className="text-3xl font-bold text-gray-800">
            Uzer<span className="text-blue-500">.</span>
          </NavLink>

          <NavLink
            to="/allProducts"
            className="hidden md:flex flex-grow mx-6 max-w-xl"
          >
            <div className="flex items-center bg-white/70 backdrop-blur-md rounded-full px-4 py-2 shadow-sm hover:shadow transition w-full">
              <select className="bg-transparent text-sm font-medium mr-2 outline-none">
                <option>All Categories</option>
              </select>
              <input
                type="text"
                placeholder="I'm searching for..."
                className="flex-grow bg-transparent text-sm px-2 focus:outline-none"
              />
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                />
              </svg>
            </div>
          </NavLink>

          <div className="flex items-center gap-3">
            <NavLink to="/userProfile" className="flex items-center gap-2">
              <img
                src={
                  userData?.avatar ||
                  "https://tse3.mm.bing.net/th?id=OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa&pid=Api&P=0&h=220"
                }
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
              />
              <div className="hidden sm:block text-sm">
                <p className="text-gray-500">Welcome</p>
                <p className="font-medium">{userData?.fname}</p>
              </div>
            </NavLink>

            <button
              onClick={handleMessageToggle}
              className="p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white transition relative"
              title="Support"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z" />
              </svg>
            </button>

            <NavLink to="/cart" className="relative flex items-center gap-2">
              <button className="p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white transition relative">
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartProductData?.length || 0}
                </div>
                <svg
                  className="w-6 h-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64z"
                  />
                </svg>
              </button>

              <div className="hidden md:flex flex-col text-right">
                <span className="text-gray-800 font-semibold text-sm p-2 bg-[#f5f5f599] rounded-[50px] border-2 border-gray-200">
                  ₹ {cartTotalPrice || 0}
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </header>

      {openMessage && (
        <div className="fixed inset-0 w-full h-screen bg-white z-50 flex flex-col md:flex-row">
          {/* Left Side Form */}
          <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10">
            <div className="w-full max-w-md space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800">
                Contact Support
              </h2>
              <input
                type="email"
                value={userData?.email || ""}
                readOnly
                className="w-full px-4 py-3 border rounded bg-gray-100 focus:outline-none"
              />
              <textarea
                rows="4"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border rounded focus:outline-none"
              />
              <button
                onClick={handleCreatePost}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
              >
                Send Message
              </button>
              <button
                onClick={handleMessageToggle}
                className="w-full py-3 mt-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex-col justify-center items-center p-10">
            <img
              src="https://res.cloudinary.com/dyphiefiy/image/upload/v1750941971/man-got-shopping-discount-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--online-sale-e-commerce-pack-illustrations-5791990_eapyra.png"
              alt="Support"
              className="w-[70%] mb-6"
            />
            <h3 className="text-2xl font-semibold mb-2">Need Assistance?</h3>
            <p className="text-center max-w-xs">
              Our support team is ready to help. Fill out the form and we'll get
              back to you shortly.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
