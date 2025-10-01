import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/assets/banner/logo.png";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navOption = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-semibold transition-colors ${
              isActive
                ? "bg-[#9ACD32] text-white"
                : "hover:bg-[#9ACD32]/70 hover:text-white"
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
            `px-3 py-2 rounded-md font-semibold transition-colors ${
              isActive
                ? "bg-[#9ACD32] text-white"
                : "hover:bg-[#9ACD32]/70 hover:text-white"
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
            `px-3 py-2 rounded-md font-semibold transition-colors ${
              isActive
                ? "bg-[#9ACD32] text-white"
                : "hover:bg-[#9ACD32]/70 hover:text-white"
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
            `px-3 py-2 rounded-md font-semibold transition-colors ${
              isActive
                ? "bg-[#9ACD32] text-white"
                : "hover:bg-[#9ACD32]/70 hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/beArider"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-semibold transition-colors ${
              isActive
                ? "bg-[#9ACD32] text-white"
                : "hover:bg-[#9ACD32]/70 hover:text-white"
            }`
          }
        >
         Be a Rider
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        {/* Left - Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Nexus Express Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl md:text-2xl font-extrabold text-gray-800">
            Nexus Express
          </span>
        </NavLink>

        {/* Center - Nav Links (only lg and up) */}
        <div className="hidden lg:flex items-center gap-4">
          <ul className="flex gap-2">{navOption}</ul>
        </div>

        {/* Right - User (only lg) */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                  {user.displayName
                    ? user.displayName[0].toUpperCase()
                    : user.email[0].toUpperCase()}
                </div>
              )}
              <span className="text-gray-800 font-medium hidden sm:inline">
                {user.displayName || "User"}
              </span>
              <button
                onClick={logOut}
                className="px-3 py-1 rounded-md font-semibold text-gray-800 border border-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-300 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className="px-3 py-1 rounded-md font-semibold text-gray-800 border border-gray-300 hover:bg-[#9ACD32] hover:text-white transition-colors duration-300 text-sm"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1 rounded-md font-semibold text-white bg-[#9ACD32] hover:bg-[#88b12a] transition-colors duration-300 text-sm"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile / Tablet Right (xs–md–lg:hidden) */}
        <div className="flex items-center gap-3 lg:hidden">
          {user && (
            <img
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${
                  user.displayName || user.email
                }`
              }
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-300 object-cover"
            />
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-2">
          <ul className="flex flex-col gap-2">{navOption}</ul>
          {user ? (
            <button
              onClick={logOut}
              className="mt-3 px-4 py-2 rounded-md font-semibold text-gray-800 border border-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-md font-semibold text-gray-800 border border-gray-300 hover:bg-[#9ACD32] hover:text-white transition-colors duration-300"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-md font-semibold text-white bg-[#9ACD32] hover:bg-[#88b12a] transition-colors duration-300"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
