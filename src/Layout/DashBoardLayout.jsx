import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/assets/banner/logo.png";
import { MdAdminPanelSettings, MdDirectionsBike } from "react-icons/md";
import { RiBikeLine, RiEBike2Fill, RiFile2Fill, RiPassPendingFill, RiPassPendingLine, RiRidingFill, RiRidingLine } from "react-icons/ri";
import useRole from "../Hooks/useRole";
import { FiCheckCircle, FiDollarSign } from "react-icons/fi";

const DashBoardLayout = () => {
  const { role, isLoading } = useRole();

  // Show loading spinner while role is loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#9ACD32]"></span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
      {/* Drawer toggle for small screens */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar (visible on small screens) */}
        <div className="w-full navbar bg-[#9ACD32] text-white border-b lg:hidden">
          <div className="flex-1 px-2 font-bold text-xl">📦 Dashboard</div>
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost text-white"
            >
              {/* Hamburger */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-base-100">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-72 min-h-full bg-white border-r shadow-lg flex flex-col">
          {/* Brand/Header */}
          <div className="px-6 py-5 bg-[#9ACD32] text-white shadow">
            <h2 className="text-2xl font-bold">📊 My Dashboard</h2>
            <p className="text-sm opacity-90">Manage your parcels</p>
          </div>

          {/* Navigation */}
          <ul className="menu p-4 text-base flex-1">
            {/* Logo */}
            <li>
              <NavLink
                to="/"
                className="flex items-end -space-x-3 mb-1"
              >
                <img
                  src={logo}
                  alt="Nexus Express Logo"
                  className="w-8 h-8 object-contain"
                />
                <p className="text-xl font-extrabold text-gray-800">
                  Nexus Express
                </p>
              </NavLink>
            </li>

            {/* 🧍 User Routes */}
            {role === "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/payment"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    📦 My Parcels
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="paymentHistory"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    💳 Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    🔍 Trace Parcel
                  </NavLink>
                </li>
              </>
            )}

            {/* 🚴 Rider Routes */}
            {role === "rider" && (
              <>
                <li>
                  <NavLink
                    to="activeRider"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    <RiEBike2Fill /> Active Rider
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="pendingDelivery"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    <RiFile2Fill /> Pending Delivery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="completedDelivery"
                    className={({ isActive }) =>
                      `rounded-lg font-medium flex items-center gap-2 px-3 py-2 ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    <FiCheckCircle /> Completed Delivery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="myEarnings"
                    className={({ isActive }) =>
                      `rounded-lg font-medium flex items-center gap-2 px-3 py-2 ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    <FiDollarSign /> My Earnings
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    🔍 Trace Parcel
                  </NavLink>
                </li>
              </>
            )}

            {/* 🛠 Admin Routes */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="activeRider"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    <RiEBike2Fill /> Active Rider
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="assign-rider"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    <RiRidingFill /> Assign Rider
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="pendingRider"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    <MdDirectionsBike /> Pending Rider
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="makeAdmin"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    <MdAdminPanelSettings /> Make Admin
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `rounded-lg font-medium ${isActive
                        ? "bg-[#9ACD32] text-white"
                        : "text-gray-700 hover:bg-green-100 hover:text-[#9ACD32]"
                      }`
                    }
                  >
                    🔍 Trace Parcel
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Footer */}
          <div className="p-4 border-t">
            <button className="btn bg-red-500 hover:bg-red-600 text-white btn-sm w-full rounded-lg">
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashBoardLayout;
