import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/actions/auth";
import Loader from "../../utility/Loader";

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.authReducer?.users);
  const [deleted, setDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getUsers());
    window.scrollTo(0, 0);
  }, [dispatch, deleted]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setDeleted(true);
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!users) return <Loader />;

  return (
    <div className="w-[85%] h-screen overflow-auto p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">User Manager</h2>
            <p className="text-gray-500 mt-1">Total Users: {users?.length}</p>
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
                <th className="p-4">Phone</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {user.fname} {user.lname}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p>{user.country}</p>
                    <p className="text-sm text-gray-500">{user.state}</p>
                  </td>
                  <td className="p-4">
                    <p>{user.city}</p>
                    <p className="text-sm text-gray-500">{user.pinCode}</p>
                  </td>
                  <td className="p-4">{user.number}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(user._id)}
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
              {filteredUsers?.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No users found.
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

export default UserManagement;
