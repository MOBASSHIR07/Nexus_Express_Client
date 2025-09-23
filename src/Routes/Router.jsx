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

 export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
        {
           path:'/',
           element:<HomePage/> 
        },
        {
          path:'coverage',
          element:<Coverage/>
        }
    ]
  },
  {
    path:'/',
    element:<AuthLayout/>,
    children:[
      {
        path:'login',
        element:<Login/>

      },
      {
        path:'register',
        element:<Register/>
      }
    ]
  }
]);

