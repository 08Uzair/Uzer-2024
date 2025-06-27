import React, { useState, useEffect } from "react";

const Sidebar = ({ onItemClick }) => {
  const [activeItem, setActiveItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);

  useEffect(() => {
    const itemName = localStorage.getItem("itemName");
    if (itemName) setActiveItem(itemName);
  }, []);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    localStorage.setItem("itemName", itemName);
    if (onItemClick) onItemClick(itemName);
  };
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  const filterText = (text) =>
    text.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className="h-screen w-64 bg-blue-600 text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="flex items-center space-x-2 p-4">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
          A
        </div>
        <h1 className="text-lg font-bold">Admin .</h1>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Quick Search..."
          className="w-full px-3 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-2 overflow-y-auto">
        {/* Dashboard Dropdown */}
        {(filterText("dashboard") ||
          filterText("analytics") ||
          filterText("user management")) && (
          <div>
            <button
              onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              <i className="bx bx-grid-alt mr-3"></i>
              Dashboard
              <i
                className={`bx ml-auto ${
                  isDashboardOpen ? "bx-chevron-up" : "bx-chevron-down"
                }`}
              />
            </button>

            {isDashboardOpen && (
              <div className="ml-6 mt-2 space-y-2">
                {filterText("analytics") && (
                  <div
                    onClick={() => handleItemClick("analytics")}
                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                      activeItem === "analytics"
                        ? "bg-white text-blue-600"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    <i className="bx bx-bar-chart-alt-2 mr-3"></i>
                    Analytics
                  </div>
                )}

                {filterText("user management") && (
                  <div
                    onClick={() => handleItemClick("users")}
                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                      activeItem === "users"
                        ? "bg-white text-blue-600"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    <i className="bx bx-folder-open mr-3"></i>
                    User Management
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* E-Commerce Dropdown */}
        {(filterText("e-commerce") ||
          filterText("orders data") ||
          filterText("products data")) && (
          <div>
            <button
              onClick={() => setIsEcommerceOpen(!isEcommerceOpen)}
              className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              <i className="bx bx-cart mr-3"></i>
              E-Commerce
              <i
                className={`bx ml-auto ${
                  isEcommerceOpen ? "bx-chevron-up" : "bx-chevron-down"
                }`}
              />
            </button>

            {isEcommerceOpen && (
              <div className="ml-6 mt-2 space-y-2">
                {filterText("orders data") && (
                  <div
                    onClick={() => handleItemClick("orders")}
                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                      activeItem === "orders"
                        ? "bg-white text-blue-600"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    <i className="bx bx-box mr-3"></i>
                    Orders Data
                  </div>
                )}

                {filterText("products data") && (
                  <div
                    onClick={() => handleItemClick("products")}
                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                      activeItem === "products"
                        ? "bg-white text-blue-600"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    <i className="bx bx-package mr-3"></i>
                    Products Data
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <hr className="my-4 border-blue-400" />

        {/* Other Items */}
        {filterText("inbox") && (
          <div
            onClick={() => handleItemClick("inbox")}
            className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
              activeItem === "inbox"
                ? "bg-white text-blue-600"
                : "hover:bg-blue-500"
            }`}
          >
            <i className="bx bx-envelope mr-3"></i>
            Inbox
          </div>
        )}

        {filterText("profile") && (
          <div
            onClick={() => handleItemClick("profile")}
            className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
              activeItem === "profile"
                ? "bg-white text-blue-600"
                : "hover:bg-blue-500"
            }`}
          >
            <i className="bx bx-user-circle mr-3"></i>
            Profile
          </div>
        )}
      </nav>

      {/* Logout Button at Bottom */}
      {filterText("log out") && (
        <div
          onClick={() => handleLogout()}
          className="flex items-center px-4 py-2 mt-4 mb-4 rounded-lg cursor-pointer hover:bg-blue-500"
        >
          <i className="bx bx-log-out mr-3"></i>
          Log Out
        </div>
      )}
    </div>
  );
};

export default Sidebar;
