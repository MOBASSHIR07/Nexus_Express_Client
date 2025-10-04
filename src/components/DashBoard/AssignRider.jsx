import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import DeliveryLoader from '../../Utils/DeliveryLoader';

const AssignRider = () => {
  const axiosSecure = useAxiosInstance();
  const queryClient = useQueryClient();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch parcels with payment_status=paid & delivery_status=Processing
  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['assign-parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        '/parcels?payment_status=paid&delivery_status=Processing'
      );
      return Array.isArray(res.data) ? res.data : [];
    },
    refetchOnWindowFocus: true,
  });

  // Fetch riders for selected parcel's sender_district
  const { 
    data: riders = [], 
    isLoading: ridersLoading,
    refetch: fetchRiders 
  } = useQuery({
    queryKey: ['riders', selectedParcel?.sender_district],
    queryFn: async () => {
      if (!selectedParcel?.sender_district) return [];
      const res = await axiosSecure.get(
        `/riders?district=${selectedParcel.sender_district}`
      );
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!selectedParcel?.sender_district && modalOpen,
  });

  // Mutation to assign rider
  const assignRiderMutation = useMutation({
    mutationFn: async ({ riderId, parcelId }) => {
      const response = await axiosSecure.put(`/parcels/assign/${parcelId}`, { 
        deliveryman_id: riderId 
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Rider assigned successfully!');
      setModalOpen(false);
      setSelectedParcel(null);
      queryClient.invalidateQueries(['assign-parcels']);
      queryClient.invalidateQueries(['riders']);
    },
    onError: (err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.error(`Failed to assign rider: ${errorMsg}`);
    },
  });

  const handleOpenModal = (parcel) => {
    setSelectedParcel(parcel);
    setModalOpen(true);
  };

  const handleAssign = (riderId) => {
    if (!selectedParcel) return;
    assignRiderMutation.mutate({ riderId, parcelId: selectedParcel._id });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedParcel(null);
  };

  if (isLoading) return <DeliveryLoader />;

  if (isError)
    return (
      <p className="text-center text-red-600 py-8">
        Failed to load parcels: {error.message}
      </p>
    );

  if (!parcels.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <span className="text-6xl mb-4 animate-bounce">📦</span>
        <h2 className="text-2xl font-semibold mb-2">No parcels to assign</h2>
        <p className="text-gray-500 max-w-sm">
          There are no paid parcels currently in processing status.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Assign Rider</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Tracking</th>
                <th>Parcel Type</th>
                <th>Sender</th>
                <th>Sender District</th>
                <th>Receiver</th>
                <th>Fare</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-50 transition">
                  <td className="font-mono">{parcel.tracking}</td>
                  <td className="capitalize">{parcel.parcel_type}</td>
                  <td>{parcel.sender_name}</td>
                  <td>{parcel.sender_district}</td>
                  <td>{parcel.receiver_name}</td>
                  <td className="font-semibold">{parcel.fare} BDT</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-white text-xs font-semibold bg-yellow-500">
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleOpenModal(parcel)}
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && selectedParcel && (
          <div className="modal modal-open">
            <div className="modal-box max-w-3xl">
              <h3 className="font-bold text-lg mb-2">
                Assign Rider for Parcel: {selectedParcel.tracking}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Looking for available riders in: <span className="font-semibold">{selectedParcel.sender_district}</span>
              </p>

              {ridersLoading ? (
                <div className="flex justify-center items-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : riders.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-2 block">🚫</span>
                  <p className="text-gray-500">
                    No available riders in {selectedParcel.sender_district}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {riders.map((rider) => (
                    <div
                      key={rider._id}
                      className="flex justify-between items-center border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{rider.name}</p>
                        <p className="text-gray-500 text-sm">
                          District: {rider.district}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Status: <span className="capitalize font-medium text-green-600">{rider.current_status}</span>
                        </p>
                      </div>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleAssign(rider._id)}
                        disabled={assignRiderMutation.isLoading}
                      >
                        {assignRiderMutation.isLoading ? 'Assigning...' : 'Assign'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-action">
                <button
                  className="btn btn-outline"
                  onClick={handleCloseModal}
                  disabled={assignRiderMutation.isLoading}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignRider;