import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { NavLink } from "react-router-dom";

export function ProductCard2() {
  const productData = useSelector((state) => state?.products?.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  console.log(productData);
  function truncateString(input, length) {
    if (input.length > length) {
      return input.slice(0, length) + "...";
    }
    return input;
  }
  return (
    <>
      <h1 className="text-3xl	font-bold  mb-12 mt-12 text-center w-full ">
        Products
      </h1>
      <div className="flex flex-wrap ">
        {productData?.slice(0, 6)?.map((item, index) => {
          return (
            <>
              <NavLink to={`/singleProduct/${item._id}`}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white m-12">
                  <img
                    className="w-full h-48 object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="py-4">
                    <div className="font-bold text-xl mb-2">
                      {truncateString(item.name, 60)}
                    </div>
                    <p className="text-gray-700 text-base">
                      {truncateString(item.description, 60)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹ {item.price}
                    </span>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </NavLink>
            </>
          );
        })}
      </div>
    </>
  );
}
