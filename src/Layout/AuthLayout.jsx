import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/assets/banner/logo.png'
import authimg from '../assets/assets/banner/authImage.png'

const AuthLayout = () => {
    return (
       
                <div className='flex-1'>
                    <Outlet />
                </div>
            
        
    );
};

export default AuthLayout;