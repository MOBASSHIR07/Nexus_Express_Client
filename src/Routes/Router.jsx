import React from 'react';
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import MainLayout from '../Layout/MainLayout';
import HomePage from '../Pages/HomePage';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Pages/Authentication/LogIn/Login';
import Register from '../Pages/Authentication/Register/Register';
import Coverage from '../Pages/Coverage/Coverage';
import SendParcel from '../Pages/SendParcel/SendParcel';
import PrivateRoute from './PrivateRoute';
import DashBoardLayout from '../Layout/DashBoardLayout';
import MyParcels from '../components/DashBoard/MyParcels';
import Payment from '../components/DashBoard/Payment';
import PaymentHistory from '../components/DashBoard/PaymentHistory';
import BeARider from '../Pages/BeARider/BeARider';
import SeePendingRiders from '../components/DashBoard/SeePendingRiders';
import ActiveRider from '../components/DashBoard/ActiveRider';
import MakeAdmin from '../components/DashBoard/MakeAdmin';
import AdminRoute from './AdminRoute';
import AssignRider from '../components/DashBoard/AssignRider';
import RiderRoute from './RiderRoute';
import PendingDelivery from '../components/DashBoard/PendingDelivery';
import CompletedDelivery from '../components/DashBoard/CompletedDelivery';
import MyEarnings from '../components/DashBoard/MyEarnings';
import TraceParcel from '../components/DashBoard/TraceParcel';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'coverage',
        element: <Coverage />
      },
      {
        path: "sendParcel",
        element: <PrivateRoute>
          <SendParcel />,
        </PrivateRoute>,
        loader: async () => {
          const res = await fetch("/service-centers.json");
          if (!res.ok) throw new Error("Failed to load warehouse.json");
          return res.json();
        },
      }, {
        path: 'beArider',
        element:
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>,
           loader: async () => {
          const res = await fetch("/service-centers.json");
          if (!res.ok) throw new Error("Failed to load warehouse.json");
          return res.json();
        },

      }

    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />

      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  //dashboard layout
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashBoardLayout />
    </PrivateRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="myparcel" replace />
      },
      {
        path: 'myparcel',
        element: <MyParcels />
      }
      ,

      {
        path:'traceParcel/:parcelId',
        element:<TraceParcel/>
      },
      {
        path: 'payment/:parcelId',
        element: <Payment />
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory />
      },
      {
        path:'pendingRider',
        element:<AdminRoute>
          <SeePendingRiders/>
        </AdminRoute>
      },
      {
        path:'activeRider',
        element:<ActiveRider/>
      },
      {
        path:'pendingDelivery',
        element:<RiderRoute><PendingDelivery/></RiderRoute>
      },
      {
        path:'completedDelivery',
        element:<RiderRoute><CompletedDelivery/></RiderRoute>
      },
      {
        path:'myEarnings',
        element:<RiderRoute><MyEarnings/></RiderRoute>
      },
      {
        path:'assign-rider',
        element:<AdminRoute>
          <AssignRider/>
        </AdminRoute>
      },
      {
        path:'makeAdmin',
        element:<AdminRoute>
          <MakeAdmin/>
        </AdminRoute>
      }

    ]


  }
]);

