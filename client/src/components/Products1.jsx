import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { NavLink } from "react-router-dom";
import { createCartProducts } from "../redux/actions/cart";
import { toast } from "react-toastify";
import Loader from "./Loader";

export function ProductCard1() {
  const productData = useSelector((state) => state?.products?.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function truncateString(input, length) {
    if (input.length > length) {
      return input.slice(0, length) + "...";
    }
    return input;
  }

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);

  const handleAddToCart = async (productId) => {
    if (!userData) {
      toast.error("User not found");
      return;
    }

    const newProduct = {
      product: productId,
      user: userData._id,
    };

    try {
      dispatch(createCartProducts(newProduct));
    } catch (error) {
      console.log(error);
    }
  };
  if (!productData) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex items-center justify-between mr-16 ml-16">
        <h1 className="text-3xl font-bold mb-12 mt-12 ">Featured Products</h1>
        <p className="text-md text-sky-400 ">
          <NavLink to="/allProducts">View more</NavLink>
        </p>
      </div>

      <div className="flex flex-wrap">
        {productData?.slice(6, 12)?.map((item, index) => {
          return (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white m-12"
            >
              <NavLink to={`/singleProduct/${item._id}`}>
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
              </NavLink>

              <div className="flex items-center justify-between py-4">
                <span className="text-2xl font-bold text-gray-900">
                  ₹ {item.price}
                </span>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                  onClick={() => handleAddToCart(item._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
