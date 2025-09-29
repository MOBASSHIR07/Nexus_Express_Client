import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/assets/banner/logo.png';
import { button, p } from 'framer-motion/client';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth()
  const navOption = <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-semibold transition-colors  ${isActive ? 'bg-[#9ACD32] text-white' : 'hover:bg-[#9ACD32]/70 hover:text-white'
          }`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/coverage"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-semibold transition-colors duration-300 ${isActive ? 'bg-[#9ACD32] text-white' : 'hover:bg-[#9ACD32]/70 hover:text-white'
          }`
        }
      >
        Coverage
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/sendParcel"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-semibold transition-colors duration-300 ${isActive ? 'bg-[#9ACD32] text-white' : 'hover:bg-[#9ACD32]/70 hover:text-white'
          }`
        }
      >
        Send a Parcel
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-semibold transition-colors duration-300 ${isActive ? 'bg-[#9ACD32] text-white' : 'hover:bg-[#9ACD32]/70 hover:text-white'
          }`
        }
      >
        DashBoard
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-semibold transition-colors duration-300 ${isActive ? 'bg-[#9ACD32] text-white' : 'hover:bg-[#9ACD32]/70 hover:text-white'
          }`
        }
      >
        About Us
      </NavLink>
    </li>
  </>;

  return (
    <div className="navbar   px-4 lg:px-16">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-lg z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            {navOption}
          </ul>
        </div>
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Nexus Express Logo" className="w-12 h-12 object-contain" />
          <p className="text-3xl font-extrabold text-gray-800">Nexus Express</p>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navOption}</ul>
      </div>

      <div className="navbar-end flex items-center space-x-3">
        {user ? (
          <>
            <p className='font-semibold'>User : <span className='text-[#9ACD32]'>{user.email}</span></p>
            <button
              onClick={logOut}
              className="px-4 py-2 rounded-md font-semibold text-gray-800 border border-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-md font-semibold text-gray-800 border border-gray-300 hover:bg-[#9ACD32] hover:text-white transition-colors duration-300"
          >
            Sign In
          </NavLink>
        )}

        <NavLink
          to="/register"
          className="px-4 py-2 rounded-md font-semibold text-white bg-[#9ACD32] hover:bg-[#88b12a] transition-colors duration-300"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
