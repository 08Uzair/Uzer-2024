import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { CartProductDeletedByUserId } from "../redux/actions/cart";

function Sucess() {
  const [userData, setUserData] = useState();
  // const dispatch = useDispatch();
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);
  //   console.log(userData);
  // useEffect(() => {
  //   dispatch(CartProductDeletedByUserId(userData?._id));
  // }, [dispatch, userData]);
  return (
    <div
      style={{ background: "#f7f7f7" }}
      className="flex items-center justify-center min-h-screen flex-col "
    >
      <img
        style={{ width: "25%" }}
        src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif"
      />
      <div className="text-center mt-5">
        <h1 className="text-4xl font-bold text-green-500 m-4">Success!</h1>
        <p className="text-xl text-green-500">
          Product Will Shipped To Your Address
        </p>
      </div>
      <div>
        <button className="m-12">
          <NavLink
            to="/"
            className="inline-block px-6 py-3 text-white bg-gray-400 hover:bg-gray-500 rounded-lg border-slate-950"
          >
            Home Page
          </NavLink>
        </button>
        <button className="m-12">
          <NavLink
            to="/allProducts"
            className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Continue Shopping
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default Sucess;
