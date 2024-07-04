import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./components/CreateCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotAuthorized from "./components/NotAuthorized";
import UpdateProduct from "./components/UpdateProduct";

const App = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  function isAuthenticated() {
    return profile?.result?.role === "admin";
  }

  function isUser() {
    return profile?.result?.role === "user";
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/403" element={<NotAuthorized />} />
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Dashboard />
            ) : isUser() ? (
              <Navigate to="/403" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/createProduct"
          element={
            isAuthenticated() ? (
              <CreateProduct />
            ) : isUser() ? (
              <Navigate to="/403" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/updateProduct/:id"
          element={
            isAuthenticated() ? (
              <UpdateProduct />
            ) : isUser() ? (
              <Navigate to="/403" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
