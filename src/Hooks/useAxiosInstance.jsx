import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosInstance = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 🧭 Request Interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 🧭 Response Interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          // 🚫 Token expired or forbidden
          Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Please login again to continue.",
            confirmButtonText: "Go to Login",
          }).then(() => {
            logOut();
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    // 🧹 Cleanup interceptors on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosInstance;
