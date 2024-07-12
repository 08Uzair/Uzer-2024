import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartProductByUserID } from "../redux/actions/cart";

const Navbar = ({ total }) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();
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
  }, []);
  // console.log(userData);

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
            <ul className="ml-4 xl:w-48 flex items-center justify-end">
              <NavLink to="/userProfile">
                <li className="ml-2 lg:ml-4 relative inline-block">
                  <img
                    className="h-8 w-11 rounded-full"
                    src={
                      profile?.result?.avatar ||
                      "https://tse3.mm.bing.net/th?id=OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa&pid=Api&P=0&h=220"
                    }
                    alt=""
                  />
                </li>
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
