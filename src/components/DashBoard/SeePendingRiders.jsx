import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import DeliveryLoader from "../../Utils/DeliveryLoader";

const SeePendingRiders = () => {
  const axiosSecure = useAxiosInstance();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // ✅ Fetch all pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/nexus/api/riders/pending");
      return res.data;
    },
  });

  // ✅ Mutation for updating rider status
  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) =>
      await axiosSecure.patch(`/nexus/api/riders/${id}`, { status }),
    onSuccess: (_, { status }) => {
      Swal.fire({
        icon: "success",
        title: `Rider ${status}`,
        text: `Rider has been marked as ${status.toLowerCase()}.`,
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["pendingRiders"]);
    },
  });

  if (isLoading) return <DeliveryLoader />;

  return (
   <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
  <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6 sm:mb-8">
    🚴 Pending Riders
  </h1>

  {riders.length === 0 ? (
    <div className="text-center text-gray-500 text-base sm:text-lg">
      No pending riders found.
    </div>
  ) : (
    <div className="overflow-x-auto shadow-2xl rounded-2xl bg-white">
      <table className="table table-auto w-full min-w-[600px] md:min-w-full">
        <thead className="bg-[#9ACD32] text-white text-sm sm:text-base">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Region</th>
            <th>Applied Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr
              key={rider._id}
              className="hover:bg-green-50 transition duration-200 text-sm sm:text-base"
            >
              <td className="font-medium">{index + 1}</td>
              <td className="font-semibold">{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.contact}</td>
              <td>{rider.region}</td>
              <td className=" gap-2 text-gray-700 ">
              
                {new Date(rider.date).toLocaleString()}
              </td>
              <td className="flex gap-2 sm:gap-4 items-center justify-center flex-wrap">
                <button
                  onClick={() => setSelectedRider(rider)}
                  className="tooltip tooltip-top text-blue-500 hover:text-blue-700"
                  data-tip="View Details"
                >
                  <FaInfoCircle size={18} />
                </button>
                <button
                  onClick={() =>
                    updateStatus({ id: rider._id, status: "Active" })
                  }
                  className="tooltip tooltip-top text-green-500 hover:text-green-700"
                  data-tip="Approve Rider"
                >
                  <FaCheckCircle size={18} />
                </button>
                <button
                  onClick={() =>
                    updateStatus({ id: rider._id, status: "Rejected" })
                  }
                  className="tooltip tooltip-top text-red-500 hover:text-red-700"
                  data-tip="Reject Rider"
                >
                  <FaTimesCircle size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Modal */}
  {selectedRider && (
    <dialog open className="modal p-2 sm:p-4">
      <div className="modal-box bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-full sm:max-w-lg">
        <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-4 text-[#9ACD32]">
          <FaInfoCircle /> Rider Details
        </h3>

        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
          <p className="flex items-center gap-2">
            <FaUser className="text-blue-500" /> <strong>Name:</strong>{" "}
            {selectedRider.name}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> <strong>Email:</strong>{" "}
            {selectedRider.email}
          </p>
          <p className="flex items-center gap-2">
            <FaPhone className="text-green-500" /> <strong>Contact:</strong>{" "}
            {selectedRider.contact}
          </p>
          <p className="flex items-center gap-2">
            <FaIdCard className="text-gray-500" /> <strong>NID:</strong>{" "}
            {selectedRider.nid}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> <strong>Address:</strong>{" "}
            {selectedRider.address}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> <strong>Region:</strong>{" "}
            {selectedRider.region}
          </p>
          {selectedRider.district && (
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> <strong>District:</strong>{" "}
              {selectedRider.district}
            </p>
          )}
          <p className="flex items-center gap-2">
            <FaClock className="text-orange-500" /> <strong>Applied:</strong>{" "}
            {new Date(selectedRider.date).toLocaleString()}
          </p>
        </div>

        <div className="modal-action mt-4 sm:mt-6 flex justify-end">
          <button
            className="btn btn-outline btn-sm sm:btn-md"
            onClick={() => setSelectedRider(null)}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  )}
</div>

  );
};

export default SeePendingRiders;
