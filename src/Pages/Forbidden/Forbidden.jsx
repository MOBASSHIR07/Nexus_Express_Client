import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 p-6 text-center">
      <div className="bg-base-100 shadow-xl p-10 rounded-2xl max-w-md w-full">
        <FaShieldAlt className="w-16 h-16 text-error mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-error mb-2">Access Denied</h1>
        <p className="text-base-content mb-6">
          You do not have permission to view this page.  
          Only administrators can access this route.
        </p>
        <Link
          to="/"
          className="btn btn-error text-white flex items-center gap-2 mx-auto"
        >
          <IoMdArrowBack size={18} />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
