import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./components/CreateCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  function isAuthenticated() {
    return profile && profile.admins && profile.admins[0]?.role === "admin";
  }

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <Dashboard /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/createProduct"
            element={
              isAuthenticated() ? <CreateProduct /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/auth"
            element={!isAuthenticated() ? <Auth /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
