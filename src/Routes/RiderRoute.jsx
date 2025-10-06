import React from 'react';
import DeliveryLoader from '../Utils/DeliveryLoader';
import { Navigate, useLocation } from 'react-router-dom';
import Forbidden from '../Pages/Forbidden/Forbidden';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';

const RiderRoute = ({children}) => {
     const { user, loading } = useAuth();
  const { role, isLoading } = useRole();
  const location = useLocation();

  
  if (loading || isLoading) {
    return <DeliveryLoader />;
  }

 
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  if (role !== "rider") {
    return <Forbidden/>
  }


  return children;
};

export default RiderRoute;