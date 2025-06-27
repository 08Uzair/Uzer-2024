import React from "react";
import { NavLink } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white/30 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center space-y-6 border-2 border-gray-200">
        <img
          src="https://res.cloudinary.com/dyphiefiy/image/upload/v1750945073/your-cart-is-empty-illustration-download-in-svg-png-gif-file-formats--shopping-3d-character-with-different-scene-pack-people-illustrations-1815069_nezsgw.webp"
          alt="Empty Cart"
          className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mb-6 object-contain"
        />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black ">
          YOUR CART IS EMPTY 😔
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4">
          Looks like you haven't added anything yet.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <NavLink
            to="/allProducts"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-full sm:w-auto text-center shadow transition"
          >
            Explore Products
          </NavLink>
          <NavLink
            to="/"
            className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg w-full sm:w-auto text-center shadow transition"
          >
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
