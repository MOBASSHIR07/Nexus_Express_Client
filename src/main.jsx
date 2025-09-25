import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Router.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
AOS.init();
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='max-w-screen-xl mx-auto font-urbanist '>
   <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
       <ToastContainer position="top-center" autoClose={3000} />
   </AuthProvider>
   </QueryClientProvider>
   </div>
  </StrictMode>,
)
AOS.refresh();
