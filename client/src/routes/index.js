import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Auth from "../components/Auth";
import ProductPage from "../components/ProductPage";
import UserProfile from "../components/UserProfile";
import CartPage from "../components/CartPage";
import { AllProducts } from "../components/AllProducts";
import EmptyCart from "../components/EmptyCart";
import Sucess from "../components/Sucess";

const profile = JSON.parse(localStorage.getItem("profile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/singleProduct/:id",
    element: <ProductPage />,
  },
  {
    path: "/auth",
    element: !profile ? <Auth /> : <Navigate to="/" replace />,
  },
  {
    path: "/allProducts",
    element: <AllProducts />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/userProfile",
        element: <UserProfile />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },

      {
        path: "/emptyCart",
        element: <EmptyCart />,
      },
      {
        path: "/paymentSucess",
        element: <Sucess />,
      },
    ],
  },
]);

export default router;
