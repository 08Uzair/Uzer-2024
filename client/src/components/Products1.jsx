import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { NavLink, useNavigate } from "react-router-dom";
import { createCartProducts } from "../redux/actions/cart";
import { toast } from "react-toastify";
import Loader from "../utility/Loader";
import { TOAST } from "../utility/constantToast";

function ProductCard1() {
  const productData = useSelector(
    (state) => state?.products?.products.products
  );
  // console.log(productData, "This is product data - 1");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);

  const handleAddToCart = (productId) => {
    if (!userData) {
      navigate("/auth");
      return;
    }

    const newProduct = { product: productId, user: userData._id };

    try {
      dispatch(createCartProducts(newProduct));
      toast.success(TOAST.CART.SUCCESS_CART);
    } catch (error) {
      console.log(error);
    }
  };

  const truncateString = (input, length) =>
    input?.length > length ? input.slice(0, length) + "..." : input;

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

  if (!productData) return <Loader />;

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between mx-4 sm:mx-16 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-12 mt-12 text-center ">
          FEATURED PRODUCTS
        </h1>
        <p className="text-md text-sky-400">
          <NavLink to="/allProducts">View more</NavLink>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-16">
        {productData?.slice(5, 13)?.map((item, index) => (
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
    </>
  );
}
export default memo(ProductCard1);
