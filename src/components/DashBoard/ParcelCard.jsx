import React from "react";
import { FaEdit, FaEye, FaTimes } from 'react-icons/fa';

const ParcelCard = ({ parcel, onDelete, onView, onEdit, onTrack }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#9ACD32] transition-all duration-200 shadow-sm hover:shadow-md relative">

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
        title="Delete Parcel"
      >
        <FaTimes className="w-3 h-3" />
      </button>

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900 truncate text-lg">
            Parcel Type : {parcel.type}
          </h3>
          <p className="text-md text-gray-600 font-mono font-semibold">
            #{parcel.tracking}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(parcel.delivery_status)}`}
        >
          {parcel.delivery_status}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-4">
        <div className="text-md">
          <span className="text-gray-600 font-semibold">From:</span>
          <span className="text-gray-900 font-bold ml-2">{parcel.sender_district}</span>
        </div>
        <div className="text-md">
          <span className="text-gray-600 font-semibold">To:</span>
          <span className="text-gray-900 font-bold ml-2">{parcel.receiver_district}</span>
        </div>
        <div className="text-md">
          <span className="text-gray-600 font-semibold">Receiver:</span>
          <span className="text-gray-900 font-bold ml-2">{parcel.receiver_name}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center py-3 border-t border-gray-100">
        <div className="text-md">
          <span className="text-gray-600 font-semibold">Weight: </span>
          <span className="font-bold text-gray-900">{parcel.weight}kg</span>
        </div>
        <div className="text-md">
          <span className="text-gray-600 font-semibold">Fare: </span>
          <span
            className={`font-bold ${parcel.payment_status === "Paid" ? "text-green-600" : "text-orange-600"}`}
          >
            ${parcel.fare}
          </span>
        </div>
        <div className="text-md">
          <h3 className="text-gray-600 font-semibold">
            Payment :
            <span
              className={`ml-1 font-bold ${parcel.payment_status === "Paid" ? "text-green-600" : "text-orange-600"}`}
            >
              {parcel.payment_status}
            </span>
          </h3>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <button
          onClick={onTrack}
          className="text-md text-blue-600 hover:text-blue-800 font-semibold transition-colors px-2 py-1 rounded hover:bg-blue-50"
        >
          Track
        </button>
        <h3 className="text-gray-600 font-semibold">
          Booking Date :
          <span className="text-md text-orange-600 font-semibold">
            {new Date(parcel.date).toLocaleDateString()}
          </span>
        </h3>

        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
            title="Edit Parcel"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            onClick={onView}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
            title="View Details"
          >
            <FaEye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParcelCard;
