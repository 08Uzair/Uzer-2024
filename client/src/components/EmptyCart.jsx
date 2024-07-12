import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-full flex items-center justify-center">
          <img
            style={{ width: "50%" }}
            src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-28/90/not_available-512.png"
          />
        </div>

        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Your Cart Is Empty
        </h1>
        <p className="text-lg text-gray-700 mb-6">Buy A New Product</p>
        <div>
          <button className="m-4">
            <NavLink
              to="/allProducts"
              className="inline-block px-6 py-3 text-white bg-gray-400 hover:bg-gray-500 rounded-lg border-slate-950 text-center"
            >
              Buy Now
            </NavLink>
          </button>

          <NavLink
            to="/"
            className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Go to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
