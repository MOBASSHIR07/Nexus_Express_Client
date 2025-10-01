import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
 
});


const useAxiosInstance = () => {
  const {user} = useAuth();
  axiosInstance.interceptors.request.use(config=>{
    config.headers.Authorization = `Bareer ${user.accessToken}`
    return config;
  },error=>{
  return Promise.reject(error)
  });
  


    return axiosInstance;
};

export default useAxiosInstance;