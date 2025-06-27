import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "../../redux/actions/orders";
import { getStatus } from "../../redux/actions/status";
import { toast } from "react-toastify";
import Loader from "../../utility/Loader";

const OrdersData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.orders?.order);
  const statusList = ["Pending", "Delivered", "Failed"];
  const [searchTerm, setSearchTerm] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [showPopoverIndex, setShowPopoverIndex] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getStatus());
    window.scrollTo(0, 0);
  }, [dispatch, deleted]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
    toast.success("Order Deleted Successfully");
    setDeleted(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus(orderId, { status: newStatus }));
    dispatch(getOrders());
    toast.success("Status Updated");
  };

  const handleMouseEnter = (index) => setShowPopoverIndex(index);
  const handleMouseLeave = () => setShowPopoverIndex(null);

  const filteredData = data?.filter(
    (item) =>
      item.user?.fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.lname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    // item.user?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // item.user?.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // item.user?.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!data) return <Loader />;

  const truncateString = (input, length) =>
    input?.length > length ? input.slice(0, length) + "..." : input;

  return (
    <div className="w-[85%] h-screen overflow-auto p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Orders Manager</h2>
            <p className="text-gray-500 mt-1">Total Orders: {data?.length}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4">User</th>
                <th className="p-4">Location</th>
                <th className="p-4">City</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={item.user?.avatar}
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.user?.fname} {item.user?.lname}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.user?.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <p>{item.user?.country}</p>
                    <p className="text-sm text-gray-500">{item.user?.state}</p>
                  </td>

                  <td className="p-4">
                    <p>{item.user?.city}</p>
                    <p className="text-sm text-gray-500">
                      {item.user?.pinCode}
                    </p>
                  </td>

                  <td className="p-4 relative">
                    <button
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="text-gray-800 hover:underline"
                    >
                      {item.quantity}
                    </button>

                    {showPopoverIndex === index && (
                      <div
                        className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="p-2 space-y-2">
                          {item.product?.map((prod) => (
                            <div
                              key={prod._id}
                              className="flex items-center gap-2 bg-gray-100 p-2 rounded-md"
                            >
                              <img
                                src={prod.image}
                                alt="Product"
                                className="w-10 h-10 object-cover rounded-md"
                              />
                              <div>
                                <p className="text-sm text-gray-700 truncate">
                                  {truncateString(prod.name, 15)}
                                </p>
                                <p className="text-sm font-bold text-gray-900">
                                  ₹{prod.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="p-4">₹{item?.paymentInfo?.totalPrice}</td>

                  <td className="p-4">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      className={`px-2 py-1 border-2 rounded-md focus:outline-none focus:ring-2
                        ${
                          item.status === "Pending"
                            ? "border-yellow-500 focus:ring-yellow-500"
                            : item.status === "Delivered"
                            ? "border-green-500 focus:ring-green-500"
                            : item.status === "Failed"
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        }
                      `}
                    >
                      {statusList?.map((status, idx) => (
                        <option key={idx} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-4">{item.user?.number}</td>

                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredData?.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersData;
