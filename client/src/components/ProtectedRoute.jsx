import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  return !!profile;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
