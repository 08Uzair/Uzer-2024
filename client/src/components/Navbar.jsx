import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartProductByUserID } from "../redux/actions/cart";
import { toast } from "react-toastify";
import { addInbox, createInbox } from "../redux/actions/inbox";
const Navbar = ({ total }) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  // console.log(email);
  // console.log(message);
  // console.log(user);
  const handleCreatePost = async () => {
    try {
      const newInbox = {
        email,
        message,
        user,
      };
      console.log(newInbox);
      await dispatch(addInbox(newInbox));
      toast.info("Check Your Email for Updates 😊");
    } catch (error) {
      console.log(error);
      toast.error("Message Sent Failed");
    }
  };
  function createAction() {
    setEmail(userData.email);
    handleCreatePost();
    handleOpen();
  }
  const profile = JSON.parse(localStorage.getItem("profile"));
  const cartProductData = useSelector((state) => state?.cart);
  // console.log(cartProductData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartProductByUserID(userData?._id));
  }, [dispatch, userData]);
  // console.log(cartProductData?.length);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
    setUser(profile?._id);
  }, []);
  console.log(userData);
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpen = () => setOpenMessage(!openMessage);
  return (
    <>
      <header className="bg-white">
        <div className="container mx-auto px-4 py-8 flex items-center">
          {/* logo */}
          <div className="mr-auto md:w-48 flex-shrink-0">
            <NavLink to="/">
              <h2 className="flex item-center justify-center text-center font-bold text-2xl">
                Uzer.
              </h2>
            </NavLink>
          </div>

          {/* search */}
          <NavLink to="/allProducts">
            <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md  xl:flex items-center">
              <select className="bg-transparent uppercase font-bold text-sm p-4 mr-4">
                <option>all categories</option>
              </select>
              <input
                className="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4"
                type="text"
                placeholder="I'm searching for ..."
              />
              <svg
                className="ml-auto h-5 px-4 text-gray-500"
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="search"
                role="img"
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

          {/* phone number */}
          <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
            <span className="font-bold md:text-xl">91-5880-2382</span>
            <span className="font-semibold text-sm text-gray-400">
              Support 24/7
            </span>
          </div>

          {/* buttons */}

          <nav className="contents">
            <ul
              style={{ width: "14.3rem" }}
              className="ml-4 flex items-center justify-end"
            >
              <NavLink to="/userProfile">
                <img
                  className="h-8 w-11 rounded-full"
                  src={
                    userData?.avatar ||
                    "https://tse3.mm.bing.net/th?id=OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa&pid=Api&P=0&h=220"
                  }
                />
              </NavLink>

              <li className="ml-2 lg:ml-4 relative inline-block">
                <NavLink to="/userProfile">
                  <div className="text-black text-md">
                    Welcome
                    <br />
                    {userData?.fname}
                  </div>
                </NavLink>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                <button title="Support" onClick={handleOpen}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 lg:h-10 p-2 text-gray-200"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"></path>
                  </svg>
                </button>
              </li>
              <div>
                {openMessage && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-2xl font-semibold text-gray-900">
                          Message
                        </h4>
                        <button
                          onClick={handleOpen}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ×
                        </button>
                      </div>
                      <form>
                        <div className="mb-4">
                          <label className="block mb-1 text-gray-700">
                            Email
                          </label>
                          <input
                            value={userData.email}
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Email..."
                          />
                        </div>
                        <div className="mb-4">
                          <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Message..."
                          />
                        </div>
                        <div className="mb-4 flex items-center">
                          <label
                            htmlFor="rememberMe"
                            className="text-sm text-gray-500"
                          >
                            <p>
                              *please send us your query, will reach out you
                              soon...
                            </p>
                          </label>
                        </div>
                        <button
                          onClick={createAction}
                          type="button"
                          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              <NavLink to="/cart">
                <li className="ml-2 lg:ml-4 relative inline-block">
                  <button onClick={() => setOpen(true)}>
                    <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-full p-4">
                      {cartProductData?.length}
                    </div>
                    <svg
                      className="h-9 lg:h-10 p-2 text-gray-500"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="shopping-cart"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                      />
                    </svg>
                  </button>
                </li>
              </NavLink>
            </ul>
          </nav>

          {/* cart count */}
          <div className="ml-4 hidden sm:flex flex-col font-bold">
            <span className="text-xs text-gray-400">Your Cart</span>
            <span> ₹{total}</span>
          </div>
        </div>
        <hr />
      </header>
    </>
  );
};

export default Navbar;
