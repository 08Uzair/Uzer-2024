import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onItemClick }) => {
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("home");
  useEffect(() => {
    const itemName = localStorage.getItem("itemName");
    setActiveItem(itemName);
  }, []);
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    onItemClick(itemName);
    console.log(itemName);
  };

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);

  const toggleDashboardDropdown = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const toggleEcommerceDropdown = () => {
    setIsEcommerceOpen(!isEcommerceOpen);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
    window.location.reload();
  };
  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex flex-col max-w-xs transition-all rounded-lg shadow-lg">
      <div className="p-6 bg-blue-500 text-white  shadow-sm">
        <h1
          className="text-2xl font-bold
        "
          onClick={() => handleItemClick("home")}
        >
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          <li className="relative">
            <button
              onClick={toggleDashboardDropdown}
              className="w-full text-left p-4 hover:bg-gray-200 flex items-center focus:outline-none cursor-pointer transition-colors rounded-lg"
            >
              <i className="bx bx-grid-alt text-lg mr-3"></i>
              Dashboard
              <i
                className={`bx ${
                  isDashboardOpen ? "bx-chevron-up" : "bx-chevron-down"
                } ml-auto`}
              ></i>
            </button>
            <div
              className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                isDashboardOpen ? "max-h-screen" : "max-h-0"
              }`}
            >
              <ul className="pl-8 space-y-1">
                <li
                  className={`p-4 hover:bg-gray-200 flex items-center cursor-pointer rounded-lg transition-colors ${
                    activeItem === "analytics" ? "bg-gray-300" : ""
                  } `}
                  onClick={() => handleItemClick("analytics")}
                >
                  <i className="bx bx-bar-chart-alt-2 text-lg mr-3"></i>
                  Analytics
                </li>
                <li
                  className={`p-4  hover:bg-gray-200 flex items-center cursor-pointer rounded-lg transition-colors ${
                    activeItem === "users" ? "bg-gray-300" : ""
                  } `}
                  onClick={() => handleItemClick("users")}
                >
                  <i className="bx bx-folder-open text-lg mr-3"></i>
                  User Management
                </li>
              </ul>
            </div>
          </li>
          <li className="relative">
            <button
              onClick={toggleEcommerceDropdown}
              className="w-full text-left p-4 hover:bg-gray-200 flex items-center focus:outline-none cursor-pointer transition-colors rounded-lg"
            >
              <i className="bx bx-cart text-lg mr-3"></i>
              E-Commerce
              <i
                className={`bx ${
                  isEcommerceOpen ? "bx-chevron-up" : "bx-chevron-down"
                } ml-auto`}
              ></i>
            </button>
            <div
              className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                isEcommerceOpen ? "max-h-screen" : "max-h-0"
              }`}
            >
              <ul className="pl-8 space-y-1">
                <li
                  className={`p-4 hover:bg-gray-200 flex items-center cursor-pointer rounded-lg transition-colors ${
                    activeItem === "orders" ? "bg-gray-300" : ""
                  } `}
                  onClick={() => handleItemClick("orders")}
                >
                  <i className="bx bx-box text-lg mr-3"></i>
                  Orders Data
                </li>
                <li
                  className={`p-4 hover:bg-gray-200 flex items-center cursor-pointer rounded-lg transition-colors ${
                    activeItem === "products" ? "bg-gray-300" : ""
                  } `}
                  onClick={() => handleItemClick("products")}
                >
                  <i className="bx bx-package text-lg mr-3"></i>
                  Products Data
                </li>
              </ul>
            </div>
          </li>
          <hr className="my-4 border-gray-300" />
          <li
            className={`p-4  flex hover:bg-gray-200 items-center cursor-pointer rounded-lg transition-colors ${
              activeItem === "inbox" ? "bg-gray-300" : ""
            }`}
            onClick={() => handleItemClick("inbox")}
          >
            <i className="bx bx-envelope text-lg mr-3"></i>
            Inbox
          </li>
          <li
            className={`p-4  flex hover:bg-gray-200 items-center cursor-pointer rounded-lg transition-colors ${
              activeItem === "profile" ? "bg-gray-300" : ""
            }`}
            onClick={() => handleItemClick("profile")}
          >
            <i className="bx bx-user-circle text-lg mr-3"></i>
            Profile
          </li>
          <button className="w-full" onClick={handleLogout}>
            <li className="p-4 hover:bg-gray-200 flex items-center cursor-pointer rounded-lg transition-colors">
              <i className="bx bx-log-out text-lg mr-3"></i>
              Log Out
            </li>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
