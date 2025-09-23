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
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='max-w-screen-xl mx-auto font-urbanist '>
   <AuthProvider>
      <RouterProvider router={router} />
   </AuthProvider>
   </div>
  </StrictMode>,
)
AOS.refresh();
