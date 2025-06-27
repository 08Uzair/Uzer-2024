import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Loader from "../utility/Loader";

const Home = lazy(() => import("../pages/Home"));
const Auth = lazy(() => import("../components/Auth"));
const ProductPage = lazy(() => import("../components/ProductPage"));
const UserProfile = lazy(() => import("../components/UserProfile"));
const CartPage = lazy(() => import("../components/CartPage"));
const AllProducts = lazy(() => import("../components/AllProducts"));
const EmptyCart = lazy(() => import("../components/EmptyCart"));
const Sucess = lazy(() => import("../components/Sucess"));

const profile = JSON.parse(localStorage.getItem("profile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/singleProduct/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <ProductPage />
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loader />}>
        {!profile ? <Auth /> : <Navigate to="/" replace />}
      </Suspense>
    ),
  },
  {
    path: "/allProducts",
    element: (
      <Suspense fallback={<Loader />}>
        <AllProducts />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/userProfile",
        element: (
          <Suspense fallback={<Loader />}>
            <UserProfile />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "/emptyCart",
        element: (
          <Suspense fallback={<Loader />}>
            <EmptyCart />
          </Suspense>
        ),
      },
      {
        path: "/paymentSucess",
        element: (
          <Suspense fallback={<Loader />}>
            <Sucess />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
