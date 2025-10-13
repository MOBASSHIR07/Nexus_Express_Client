import React from 'react';
import useRole from '../../Hooks/useRole';
import RiderHome from './RiderHome';
import AdminHome from './AdminHome';
import DeliveryLoader from '../../Utils/DeliveryLoader';
import MyParcels from '../../components/DashBoard/MyParcels';
import AdminRoute from '../../Routes/AdminRoute';
import RiderRoute from '../../Routes/RiderRoute';

const DashBoardPage = () => {
    const { role, isLoading } = useRole();

    if (isLoading) {
        return <DeliveryLoader />;
    }

    // Render based on role
    if (role === 'admin') {
        return <AdminRoute>
            <AdminHome />
        </AdminRoute>
    }

    if (role === 'rider') {
        return <RiderRoute>
            <RiderHome />
        </RiderRoute>
    }


    return <MyParcels />
};

export default DashBoardPage;
