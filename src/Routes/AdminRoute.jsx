import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import DeliveryLoader from "../Utils/DeliveryLoader";
import Forbidden from "../Pages/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();
  const location = useLocation();

  
  if (loading || isLoading) {
    return <DeliveryLoader />;
  }

 
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  if (role !== "admin") {
    return <Forbidden/>
  }


  return children;
};

export default AdminRoute;
