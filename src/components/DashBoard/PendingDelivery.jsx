import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import useAuth from "../../Hooks/useAuth";
import DeliveryLoader from "../../Utils/DeliveryLoader";

const PendingDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosInstance();
  const queryClient = useQueryClient();

  // Fetch parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["rider-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/pending?rider_email=${user?.email}`);
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  // Update parcel status mutation
  const updateParcelMutation = useMutation({
    mutationFn: async ({ parcelId, newStatus,Amount }) => {
      const res = await axiosSecure.put(`/parcels/update-status/${parcelId}`, {
        newStatus,
        Amount
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rider-parcels"]);
      toast.success("Parcel status updated!");
    },
    onError: (error) => {
      toast.error("Failed to update parcel status");
    },
  });

  // Update rider status mutation
  const updateRiderMutation = useMutation({
    mutationFn: async (newStatus) => {
      const res = await axiosSecure.put(`/riders/update-status`, {
        rider_email: user?.email,
        newStatus,
      });
      return res.data;
    },
    onError: (error) => {
      toast.error("Failed to update rider status");
    },
  });

  // Handle Accept Delivery
  const handleAccept = async (parcel) => {
    const confirm = await Swal.fire({
      title: "Accept Delivery?",
      text: "You are about to accept this parcel for delivery.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept",
    });

    if (confirm.isConfirmed) {
      try {
        // Update parcel status
        await updateParcelMutation.mutateAsync({
          parcelId: parcel._id,
          newStatus: "In-Transit",
        });
        
        // Update rider status to busy
        await updateRiderMutation.mutateAsync("in-delivery");
        
      } catch (error) {
        console.error("Error accepting delivery:", error);
      }
    }
  };

  // Handle Mark as Delivered
  const handleDeliver = async (parcel) => {
    const confirm = await Swal.fire({
      title: "Mark as Delivered?",
      text: "Confirm that this parcel has been delivered successfully.",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Delivered",
    });

    if (confirm.isConfirmed) {
      try {
        // Update parcel status
        await updateParcelMutation.mutateAsync({
          parcelId: parcel._id,
          newStatus: "Delivered",
          Amount : parcel.fare
        });
        
        // Update rider status to available
        await updateRiderMutation.mutateAsync("available");
        
      } catch (error) {
        console.error("Error marking as delivered:", error);
      }
    }
  };

  if (isLoading) return <DeliveryLoader />;

  if (!parcels.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <span className="text-6xl mb-4">📦</span>
        <h2 className="text-2xl font-semibold mb-2">No Pending Deliveries</h2>
        <p className="text-gray-500">You have no parcels currently assigned or in-transit.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Pending Deliveries</h1>

        <div className="overflow-x-auto shadow-md rounded-xl bg-white">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr className="text-gray-700 text-sm uppercase">
                <th className="py-3 px-4 text-left">Tracking</th>
                <th className="py-3 px-4 text-left">Receiver</th>
                <th className="py-3 px-4 text-left">District</th>
                <th className="py-3 px-4 text-left">Fare</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{parcel.tracking}</td>
                  <td className="py-3 px-4">{parcel.receiver_name}</td>
                  <td className="py-3 px-4">{parcel.receiver_district}</td>
                  <td className="py-3 px-4">{parcel.fare} BDT</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        parcel.delivery_status === "Rider-assign"
                          ? "bg-yellow-500"
                          : parcel.delivery_status === "In-Transit"
                          ? "bg-blue-500"
                          : "bg-green-600"
                      }`}
                    >
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {parcel.delivery_status === "Rider-assign" && (
                      <button
                        onClick={() => handleAccept(parcel)}
                        disabled={updateParcelMutation.isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm transition disabled:opacity-50"
                      >
                        {updateParcelMutation.isLoading ? "Updating..." : "Accept"}
                      </button>
                    )}
                    
                    {parcel.delivery_status === "In-Transit" && (
                      <button
                        onClick={() => handleDeliver(parcel)}
                        disabled={updateParcelMutation.isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition disabled:opacity-50"
                      >
                        {updateParcelMutation.isLoading ? "Updating..." : "Delivered"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingDelivery;