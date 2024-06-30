import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import UserManagement from "./Dashboard/UserManagement";
import Home from "./Home";
import Analytics from "./Dashboard/Analytics";
import OrdersData from "./Ecommerce/OrdersData";
import ProductsData from "./Ecommerce/ProductsData";
import Inbox from "./Inbox";
import Profile from "./Profile";

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState("home");
  useEffect(() => {
    const itemName = localStorage.getItem("itemName");
    setSelectedItem(itemName);
  }, []);
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    localStorage.setItem("itemName", itemName);
  };
  return (
    <div className="flex item-center ">
      <Sidebar onItemClick={handleItemClick} />
      {selectedItem === "home" && <Home />}
      {selectedItem === "analytics" && <Analytics />}
      {selectedItem === "users" && <UserManagement />}
      {selectedItem === "orders" && <OrdersData />}
      {selectedItem === "products" && <ProductsData />}
      {selectedItem === "inbox" && <Inbox />}
      {selectedItem === "profile" && <Profile />}
    </div>
  );
};

export default Dashboard;
