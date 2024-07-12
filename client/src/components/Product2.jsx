import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { NavLink } from "react-router-dom";
import {
  createCartProducts,
  getCartProductByUserID,
} from "../redux/actions/cart";
import { toast } from "react-toastify";
import Loader from "./Loader";

export function ProductCard2() {
  const productData = useSelector((state) => state?.products?.products);
  const [userData, setUserData] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);
  // const cartProducts = useSelector((state) => state?.cart);
  // console.log(cartProducts);
  // useEffect(() => {
  //   dispatch(getCartProductByUserID(userData._id));
  // }, [dispatch]);

  function truncateString(input, length) {
    if (input.length > length) {
      return input.slice(0, length) + "...";
    }
    return input;
  }
  // function allReadyAdded(itemId) {
  //   cartProducts.map((item, index) => {
  //     if (item._id === itemId) {
  //       toast.warn("Product is Allready Added");
  //     }
  //   });
  // }

  // const [userData, setUserData] = useState();

  // useEffect(() => {
  //   const profile = JSON.parse(localStorage.getItem("profile"))?.result;
  //   setUserData(profile);
  // }, []);

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
      console.log("Added product to cart:", newProduct); // Debugging log
    } catch (error) {
      console.log(error);
    }
  };
if(!productData){
  return<Loader/>
}
  return (
    <>
      <h1 className="text-3xl font-bold mb-12 mt-12 text-center w-full">
        Top Products
      </h1>
      <div className="flex flex-wrap">
        {productData?.slice(0, 3)?.map((item, index) => {
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
                  onClick={() => {
                    handleAddToCart(item._id);
                    // handleAddToCart(item._id), allReadyAdded(item._id);
                  }}
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
