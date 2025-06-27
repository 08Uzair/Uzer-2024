import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInbox, getInbox } from "../redux/actions/inbox";
import { getTime } from "../utility/getTime";
import { toast } from "react-toastify";
import Loader from "../utility/Loader";

const Inbox = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const data = useSelector((state) => state.inbox.message);

  useEffect(() => {
    dispatch(getInbox());
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (id) => {
    dispatch(deleteInbox(id));
    setDeleted(true);
    toast.success("Message Deleted Successfully 😊");
  };

  if (!data) return <Loader />;

  return (
    <div className="w-[85%] h-screen overflow-auto p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Inbox</h2>
            <p className="text-gray-500 mt-1">Total Messages: {data?.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">User ID</th>
                <th className="p-4 font-semibold">Message</th>
                <th className="p-4 font-semibold">Time</th>
                <th className="p-4 font-semibold">Delete</th>
              </tr>
            </thead>

            <tbody>
              {data
                ?.slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={item?.user?.avatar}
                        alt={item?.user?.fname}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item?.user?.fname} {item?.user?.lname}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {item?.user?.email}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="text-gray-800 text-sm">{item?.user?._id}</p>
                    </td>

                    <td className="p-4">
                      <p className="text-gray-800 line-clamp-1">
                        {item?.message}
                      </p>
                    </td>

                    <td className="p-4">
                      <p className="text-gray-800 text-sm">
                        {getTime(item?.createdAt)}
                      </p>
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
              {data?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No messages found.
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

export default Inbox;
