import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./components/Auth";
import ProductPage from "./components/ProductPage";
import UserProfile from "./components/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./components/CartPage";
import { AllProducts } from "./components/AllProducts";
import EmptyCart from "./components/EmptyCart";
import Sucess from "./components/Sucess";
import { Footer } from "./components/Footer";
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
          <Route
            path="/cart"
            element={isAuthenticated ? <CartPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/allProducts"
            element={
              isAuthenticated ? <AllProducts /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/emptyCart"
            element={isAuthenticated ? <EmptyCart /> : <Navigate to="/auth" />}
          />
          <Route
            path="/paymentSucess"
            element={isAuthenticated ? <Sucess /> : <Navigate to="/auth" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
