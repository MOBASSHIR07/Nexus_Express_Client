import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import ParcelCard from './ParcelCard';
import DeliveryLoader from '../../Utils/DeliveryLoader';
import { useNavigate } from 'react-router-dom';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosInstance();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch parcels
  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (parcelId) => axiosSecure.delete(`/parcels/${parcelId}`),
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['my-parcels', user.email] });
      toast.success('📦 Parcel deleted successfully!');
    },
    onError: (err) => {
      toast.error(`❌ Error deleting parcel: ${err.message}`);
    },
  });

  // Toast confirmation for delete
  const handleDeleteToast = (parcelId) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col space-y-2">
          <span>Are you sure you want to delete this parcel?</span>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                deleteMutation.mutate(parcelId);
                closeToast();
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-300 text-black rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  // Payment handler (placeholder for now)
  const handlePay = async (parcelId) => {
   
    navigate(`/dashboard/payment/${parcelId}`)
     
  };

  if (isLoading) return <DeliveryLoader />;

  if (isError) {
    return (
      <p className="text-center text-red-600 py-8">
        Failed to load parcels: {error.message}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Parcels</h1>

        {!parcels || parcels.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No parcels yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You haven't created any parcel deliveries. Start by adding a new parcel!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {parcels.map((parcel) => (
              <ParcelCard
                key={parcel._id}
                parcel={parcel}
                onDelete={() => handleDeleteToast(parcel._id)}
                onView={() => console.log('view later')}
                onEdit={() => console.log('edit later')}
                onTrack={() => console.log('track later')}
                onPay={() => handlePay(parcel._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParcels;
