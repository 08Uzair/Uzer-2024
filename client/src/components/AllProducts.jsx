import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { NavLink, useLocation } from "react-router-dom";
import {
  createCartProducts,
  getCartProductByUserID,
} from "../redux/actions/cart";
import { toast } from "react-toastify";
import Loader from "../utility/Loader";
import { Footer } from "./Footer";

export function AllProducts() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [query, setQuery] = useState("");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const cartProductData = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  useEffect(() => {
    
    const category = queryParams.get("category");
    if (category !== null) {
      setQuery(category.toLowerCase());
    }
    console.log(category);
  }, [queryParams]);
  useEffect(() => {
    dispatch(getCartProductByUserID(userData?._id));
  }, [dispatch, userData]);

  const productData = useSelector((state) => state?.products?.products);
  // console.log(productData);

  useEffect(() => {
    dispatch(getProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  function truncateString(input, length) {
    if (input.length > length) {
      return input.slice(0, length) + "...";
    }
    return input;
  }

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
      quantity: 1,
    };

    try {
      dispatch(createCartProducts(newProduct));
      console.log("Added product to cart:", newProduct);
    } catch (error) {
      console.log(error);
    }
  };
  if (!productData) {
    return <Loader />;
  }

  return (
    <>
      <header style={{ width: "100%", top: "0rem" }} className="bg-white fixed">
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
          <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
            <select className="bg-transparent uppercase font-bold text-sm p-4 mr-4">
              <option>all categories</option>
            </select>
            <input
              className="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4"
              type="text"
              placeholder="I'm searching for ..."
              onChange={(e) => setQuery(e.target.value?.toLowerCase())}
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

          {/* phone number */}
          <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
            <span className="font-bold md:text-xl">98-9056-2214</span>
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
                    className="h-8 w-8 rounded-full"
                    src={
                      profile?.result?.avatar ||
                      "https://tse3.mm.bing.net/th?id=OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa&pid=Api&P=0&h=220"
                    }
                    alt=""
                  />
                </li>
              </NavLink>
              <li className="ml-2 lg:ml-4 relative inline-block">
                <button onClick={() => setOpen(true)}>
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-full p-4">
                    {cartProductData?.length}
                  </div>
                  <NavLink to="/cart">
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
                  </NavLink>
                </button>
              </li>
            </ul>
          </nav>

          {/* cart count */}
          <div className="ml-4 hidden sm:flex flex-col font-bold">
            <span className="text-xs text-gray-400">Your Cart</span>
            <span> ₹ </span>
          </div>
        </div>
        <hr />
      </header>
      <h1 className="text-3xl font-bold mb-12 mt-12 text-center w-full">
        All Products
      </h1>
      <div className="flex flex-wrap item-center justify-center">
        {productData
          ?.filter(
            (item) =>
              item?.name?.toLowerCase()?.includes(query) ||
              item?.category?.name?.toLowerCase()?.includes(query) ||
              item?.description?.toLowerCase()?.includes(query)
          )
          ?.map((item, index) => {
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
      <Footer />
    </>
  );
}
