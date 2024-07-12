import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/actions/product";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../utility/Loader";
function truncateString(input, length) {
  if (input.length > length) {
    return input.slice(0, length) + "...";
  }
  return input;
}
const Modal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/3">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
          >
            <i className="bx bx-x text-xl font-bold"></i>
          </button>
        </div>
        <>
          <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white m-12">
            <img
              className="w-full h-48 object-cover"
              src={product.image}
              alt={product.name}
            />
            <div className="py-4">
              <div className="font-bold text-xl mb-2">
                {truncateString(product.name, 70)}
              </div>
              <p className="text-gray-700 text-base">
                {truncateString(product.description, 70)}
              </p>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-2xl font-bold text-gray-900">
                ₹ {product.price}
              </span>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        </>
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
    window.location.reload();
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };
  if (!productData) {
    return <Loader />;
  }
  return (
    <>
      <div style={{ width: "85%", height: "100vh" }}>
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
            <div className="flex items-center justify-between gap-8 mb-16">
              <div>
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Products Management
                </h5>
                <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 mb-8">
                  Total Products : {productData?.length}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0 sm:flex-row mb-4">
                <button
                  className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  view all
                </button>
                <button
                  className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={() => navigate("/createProduct")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    stroke-width="2"
                    className="w-4 h-4"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                  Add Products
                </button>
              </div>
            </div>
          </div>
          <div className=" px-0 overflow-scroll">
            <table className="w-full mt-4 text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Product Name
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Price&Discount
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Stocks
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Created At
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Edit
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
                      title="Client View"
                    >
                      Client View
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Delete
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {productData
                  ?.slice()
                  .reverse()
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="relative inline-block h-12 w-12  object-cover object-center"
                            />
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {truncateString(item.name, 70)}
                              </p>
                              <div className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                {truncateString(item.description, 70)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex flex-col">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              PRICE : ₹{item.price}
                            </p>
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                              DISCOUNT : {item.discount}%
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="w-max">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                              {item.stocks}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            23/04/18
                          </p>
                        </td>
                        <NavLink to={`/updateProduct/${item._id}`}>
                          <td className="p-4 border-b border-blue-gray-50">
                            <button
                              className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              title="Edit"
                              type="button"
                            >
                              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  className="w-4 h-4"
                                >
                                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                </svg>
                              </span>
                            </button>
                          </td>
                        </NavLink>

                        <td className="p-4 border-b border-blue-gray-50">
                          <button
                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            title="Client View"
                            onClick={() => openModal(item)}
                          >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-4 h-4"
                              >
                                <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"></path>
                                <path d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2 2-.916 2-2-.916-2-2-2z"></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <button
                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => handleDelete(`${item._id}`)}
                            title="Delete"
                          >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-4 h-4"
                              >
                                <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductsData;
