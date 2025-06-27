import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { NavLink } from "react-router-dom";

const Recomended = () => {
  const dispatch = useDispatch();
  function truncateString(input, length) {
    if (input.length > length) {
      return input.slice(0, length) + "...";
    }
  }
  const recommendedProducts = useSelector((state) => state?.products?.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedProducts?.slice(0, 3)?.map((item, index) => (
            <div
              className="border border-gray-200 p-4 rounded-lg shadow-sm"
              key={index}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold mb-2">
                {truncateString(item.name, 50)}
              </h3>
              <div className="text-gray-700">₹ {item.price}</div>
              <NavLink to={`/singleProduct/${item._id}`}>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  View Details
                </button>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Recomended;
