import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/actions/orders";
import { getStatus } from "../../redux/actions/status";
import { toast } from "react-toastify";

const OrdersData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.orders);

  useEffect(() => {
    dispatch(getOrders());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
    toast.success("Order Deleted Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    dispatch(getStatus());
  }, [dispatch]);

  const [showPopoverIndex, setShowPopoverIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setShowPopoverIndex(index);
  };

  const handleMouseLeave = () => {
    setShowPopoverIndex(null);
  };

  return (
    <div style={{ width: "85%", height: "100vh" }}>
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
          <div className="flex items-center justify-between gap-8 mb-8">
            <div>
              <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Orders Data
              </h5>
              <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Number of Orders: {data.length}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="block w-full overflow-hidden md:w-max"></div>
            <div className="w-full md:w-72">
              <div className="relative h-10 w-full min-w-[200px]">
                <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    ></path>
                  </svg>
                </div>
                <input
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Search
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 px-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Users
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Location
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    City
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Quantity
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Total Price
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Status
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Mobile Number
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
              {data?.map((item, index) => (
                <tr key={item._id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.user?.avatar}
                        title="Name"
                        className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                      />
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.user?.fname} {item.user?.lname}
                        </p>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                          {item.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.user?.country}
                      </p>
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                        {item.user?.state}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.user?.city}
                      </p>
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                        {item.user?.pinCode}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="relative">
                      <button
                        className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 p-4 "
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.quantity}
                      </button>
                      {showPopoverIndex === index && (
                        <div
                          className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="p-2 space-y-2">
                            {item.product.map((data) => (
                              <div
                                key={data._id}
                                className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md"
                              >
                                <img
                                  src={data.image}
                                  alt="Product"
                                  className="w-12 h-12 object-cover rounded-md"
                                />
                                <div>
                                  <p className="text-sm text-gray-700 line-clamp-1">
                                    {data.description}
                                  </p>
                                  <p className="text-sm font-bold text-gray-900">
                                    {data.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {item?.paymentInfo?.totalPrice}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      Status
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {item.user?.number}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={() => handleDelete(item._id)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersData;
