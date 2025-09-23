import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';
import DeliveryLoader from '../Utils/DeliveryLoader';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    if(loading)
    {
        return <DeliveryLoader></DeliveryLoader>
    }
    if(!user){
        return <Navigate to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;