import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID, getProducts } from "../redux/actions/products";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state?.products?.[0]);
  useEffect(() => {
    dispatch(getProductByID(id));
  }, [dispatch, id]);
  const recommendedProducts = useSelector((state) =>
    state?.products?.products?.slice(3, 6)
  );
  console.log(singleProduct);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  // console.log(recommendedProducts);
  function truncateString(input, length) {
    if (input.length > length) {
      return input.slice(0, length) + "...";
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center h-20">
            <img
              src={singleProduct?.image}
              alt={singleProduct?.name}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{singleProduct?.name}</h1>
            <p className="text-gray-700 mb-4">{singleProduct?.description}</p>
            <div className="text-2xl font-bold mb-4">
              ₹ {singleProduct?.price}
            </div>
            <div className="mb-4">
              <span className="block font-semibold mb-2">Size:</span>
              <div className="flex gap-2">
                <button
                  key={singleProduct?.size}
                  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  {singleProduct?.size}
                </button>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              Add to Cart
            </button>
            <p className="text-gray-700 mt-8">{singleProduct?.description}</p>
          </div>
        </div>

        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts?.map((item, index) => (
              <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
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
        </div> */}
      </div>
    </>
  );
};

export default ProductPage;
