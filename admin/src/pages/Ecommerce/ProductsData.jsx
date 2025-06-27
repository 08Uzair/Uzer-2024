import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/actions/product";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../utility/Loader";
import { simpleDate } from "../../utility/getTime";
import { toast } from "react-toastify";

const truncateString = (input, length) =>
  input?.length > length ? input.slice(0, length) + "..." : input;

const Modal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white p-6 rounded-xl shadow-xl w-11/12 sm:w-2/3 lg:w-1/3 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        <div className="space-y-4">
          <div className="w-full h-[230px] overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            {truncateString(product.name, 70)}
          </h2>

          <p className="text-gray-600">
            {truncateString(product.description, 200)}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg shadow flex flex-col">
              <span className="text-gray-500">Price</span>
              <span className="font-bold text-lg text-gray-900">
                ₹ {product.price}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow flex flex-col">
              <span className="text-gray-500">Discount</span>
              <span className="font-bold text-lg text-green-600">
                {product.discount}%
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow flex flex-col">
              <span className="text-gray-500">Stocks</span>
              <span className="font-bold text-lg">{product.stocks}</span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow flex flex-col">
              <span className="text-gray-500">Created At</span>
              <span className="font-bold text-lg">
                {simpleDate(product?.createdAt)}
              </span>
            </div>
          </div>

          {/* <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
};

const ProductsData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productData = useSelector((state) => state?.product?.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getProducts());
    toast.success("Product Deleted Successfully");
  };

  if (!productData) return <Loader />;

  return (
    <>
      <div className="w-[85%] h-screen overflow-auto p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Products Management
              </h2>
              <p className="text-gray-500 mt-1">
                Total Products: {productData?.length}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <button className="border border-gray-800 px-4 py-2 rounded hover:bg-gray-50">
                View All
              </button>
              <button
                onClick={() => navigate("/createProduct")}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:opacity-90 flex items-center gap-2"
              >
                <i className="bx bx-plus text-lg"></i>
                Add Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Price & Discount</th>
                  <th className="p-4 font-semibold">Stocks</th>
                  <th className="p-4 font-semibold">Created At</th>
                  <th className="p-4 font-semibold">Edit</th>
                  <th className="p-4 font-semibold">View</th>
                  <th className="p-4 font-semibold">Delete</th>
                </tr>
              </thead>

              <tbody>
                {productData
                  ?.slice()

                  .map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-2 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {truncateString(item.name, 40)}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {truncateString(item.description, 50)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-800">₹ {item.price}</p>
                        <p className="text-gray-500 text-sm">
                          Discount: {item.discount}%
                        </p>
                      </td>
                      <td className="p-4">{item.stocks}</td>
                      <td className="p-4">{simpleDate(item?.createdAt)}</td>
                      <td className="p-4">
                        <NavLink
                          to={`/updateProduct/${item._id}`}
                          className="text-gray-700 hover:text-black"
                          title="Edit"
                        >
                          <i className="bx bx-edit text-lg"></i>
                        </NavLink>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            setSelectedProduct(item);
                            setIsModalOpen(true);
                          }}
                          className="text-gray-700 hover:text-black"
                          title="View"
                        >
                          <i className="bx bx-show text-lg"></i>
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <i className="bx bx-trash text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                {productData?.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductsData;
