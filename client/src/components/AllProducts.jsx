import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  createCartProducts,
  getCartProductByUserID,
} from "../redux/actions/cart";
import Loader from "../utility/Loader";
import { Footer } from "./Footer";

function AllProducts() {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const cartProductData = useSelector((state) => state?.cart);
  const productData = useSelector(
    (state) => state?.products?.products?.products
  );

  const profile = JSON.parse(localStorage.getItem("profile"));

  const cartTotalPrice = cartProductData?.reduce((total, item) => {
    const price = parseFloat(item?.product?.price) || 0;
    const quantity = item?.quantity || 1;
    return total + price * quantity;
  }, 0);

  useEffect(() => {
    const category = new URLSearchParams(search).get("category");
    if (category) setQuery(category.toLowerCase());
  }, [search]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
    if (profile?._id) {
      dispatch(getCartProductByUserID(profile._id));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    if (!userData) {
      navigate("/auth");
      return;
    }
    const newProduct = {
      product: productId,
      user: userData._id,
      quantity: 1,
    };
    dispatch(createCartProducts(newProduct));
  };
  const renderStars = (rank) => {
    const filledStars = parseInt(rank) || 0;
    const totalStars = 5;
    return (
      <div className="flex space-x-1 mt-1">
        {Array.from({ length: totalStars }, (_, index) =>
          index < filledStars ? (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.194 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.125 2.27a1 1 0 00-.364 1.118l1.194 3.674c.3.921-.755 1.688-1.538 1.118l-3.125-2.27a1 1 0 00-1.175 0l-3.125 2.27c-.783.57-1.838-.197-1.538-1.118l1.194-3.674a1 1 0 00-.364-1.118L2.41 9.101c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.194-3.674z" />
            </svg>
          ) : (
            <svg
              key={index}
              className="w-4 h-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.194 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.125 2.27a1 1 0 00-.364 1.118l1.194 3.674c.3.921-.755 1.688-1.538 1.118l-3.125-2.27a1 1 0 00-1.175 0l-3.125 2.27c-.783.57-1.838-.197-1.538-1.118l1.194-3.674a1 1 0 00-.364-1.118L2.41 9.101c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.194-3.674z" />
            </svg>
          )
        )}
      </div>
    );
  };
  const truncateString = (input, length) =>
    input?.length > length ? input.slice(0, length) + "..." : input;

  if (!productData) return <Loader />;

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-4 m-2 sm:m-4 rounded-2xl z-50 backdrop-blur-md border-2 border-gray-200 bg-[#f5f5f599] shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3 sm:px-6 gap-2">
          <NavLink to="/" className="text-3xl font-bold text-gray-800">
            Uzer<span className="text-blue-500">.</span>
          </NavLink>

          {/* Search */}
          <div className="flex flex-grow w-full sm:w-auto mx-0 sm:mx-6 mt-2 sm:mt-0 max-w-xl">
            <div className="flex items-center bg-white/70 backdrop-blur-md rounded-full px-4 py-2 shadow-sm w-full">
              <select className="bg-transparent text-sm font-medium mr-2 outline-none">
                <option>All Categories</option>
              </select>
              <input
                type="text"
                placeholder="I'm searching for..."
                className="flex-grow bg-transparent text-sm px-2 focus:outline-none"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 
                  50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 
                  208s93.1 208 208 208c52 0 99.5-19.1 
                  136-50.6v13.2c0 3.2 1.3 6.2 
                  3.5 8.5l121.4 121.4c4.7 4.7 
                  12.3 4.7 17 0l22.6-22.6c4.7-4.7 
                  4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 
                  48 208 48s160 71.6 160 160-71.6 160-160 160z"
                />
              </svg>
            </div>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <NavLink to="/userProfile">
              <img
                src={
                  profile?.result?.avatar ||
                  "https://tse3.mm.bing.net/th?id=OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa&pid=Api&P=0&h=220"
                }
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border shadow"
              />
            </NavLink>

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
                    d="M551.991 64H144.28l-8.726-44.608C133.35 
                    8.128 123.478 0 112 0H12C5.373 0 0 
                    5.373 0 12v24c0 6.627 5.373 
                    12 12 12h80.24l69.594 
                    355.701C150.796 415.201 
                    144 430.802 144 
                    448c0 35.346 28.654 64 64 64s64-28.654 
                    64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 
                    63.681 0 0 0-8.583 32c0 35.346 
                    28.654 64 64 64 35.346 0 64-28.654 
                    64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 
                    0 21.054-7.869 23.452-18.902l45.216-208C578.695 
                    78.139 567.299 64 551.991 64z"
                  />
                </svg>
              </button>
              <span className="text-gray-800 font-semibold text-sm p-2 bg-[#f5f5f599] rounded-[50px] border-2 border-gray-200">
                ₹ {cartTotalPrice || 0}
              </span>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <div className="mt-16 max-w-7xl mx-auto px-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productData
            ?.filter(
              (item) =>
                item?.name?.toLowerCase().includes(query) ||
                item?.category?.name?.toLowerCase().includes(query) ||
                item?.description?.toLowerCase().includes(query)
            )
            ?.map((item, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
              >
                <NavLink to={`/singleProduct/${item._id}`}>
                  <div className="h-48 sm:h-52 md:h-56 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                </NavLink>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                      {truncateString(item.name, 40)}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {truncateString(item.description, 60)}
                    </p>
                    {renderStars(item.rank)}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-md sm:text-lg font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      ₹ {item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default memo(AllProducts);
