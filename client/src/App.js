import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./components/Auth";
import ProductPage from "./components/ProductPage";
import UserProfile from "./components/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  let isAuthenticated;

  if (profile === null) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleProduct/:id" element={<ProductPage />} />
          <Route
            path="/auth"
            element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/userProfile"
            element={
              isAuthenticated ? <UserProfile /> : <Navigate to="/auth" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
