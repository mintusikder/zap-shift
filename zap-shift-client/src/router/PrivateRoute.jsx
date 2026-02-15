// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router"; // ✅ react-router-dom for v6
import useAuth from "../hook/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // ✅ Get auth state
  const location = useLocation(); // ✅ Get current location

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, render the children components
  return children;
};

export default PrivateRoute;
