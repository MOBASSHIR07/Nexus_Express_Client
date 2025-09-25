import React from 'react';
import {
  createBrowserRouter,
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
        element:<PrivateRoute>
          <SendParcel />,
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
    path:'/dashboard',
    element:<PrivateRoute>
         <DashBoardLayout/>
         </PrivateRoute>,
    children:[
      {
        path:'/dashboard/myParcels',
        element:<MyParcels/>
      }
    ]

    
  }
]);

