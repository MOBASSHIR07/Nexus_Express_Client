import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import useAuth from "../../Hooks/useAuth";

const CompletedDelivery = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosInstance();
    const queryClient = useQueryClient();

    // Fetch completed parcels
    const { data: completedParcels = [], isLoading } = useQuery({
        queryKey: ["completed-parcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/completed?rider_email=${user?.email}`);
            return res.data || [];
        },
        enabled: !!user?.email,
    });

    // Fetch pending payments for cashout
    const { data: pendingPayments = [] } = useQuery({
        queryKey: ["pending-payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/pending-payments?rider_email=${user?.email}`);
            return res.data || [];
        },
        enabled: !!user?.email,
        
    });

    // Cashout mutation
    const cashoutMutation = useMutation({
        mutationFn: async (cashoutData) => {
            const res = await axiosSecure.put(`/riders/cashout`, cashoutData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["pending-payments"]);
            toast.success("Cashout successful!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Cashout failed!");
        }
    });

    // Handle individual parcel cashout
    const handleCashout = async (payment) => {
        const result = await Swal.fire({
            title: `Cashout $${payment.amount}?`,
            text: "This amount will be transferred to your account",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Cash Out",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            cashoutMutation.mutate({
                rider_email: user?.email,
                cashout_amount: payment.amount,
                parcel_id: payment.parcel_id
            });
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Completed Deliveries</h1>

                {/* Pending Payments for Cashout */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-800">Pending Cashout</h2>
                    </div>
                    
                    {pendingPayments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No pending payments available for cashout</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Parcel ID</th>
                                        <th className="py-3 px-4 text-left">Amount</th>
                                        <th className="py-3 px-4 text-left">Earned Date</th>
                                        <th className="py-3 px-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingPayments.map((payment) => (
                                        <tr key={payment._id} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-4">{payment.parcel_id}</td>
                                            <td className="py-3 px-4 font-semibold text-green-600">
                                                ${payment.amount}
                                            </td>
                                            <td className="py-3 px-4">
                                                {new Date(payment.earned_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                {payment.status === 'pending' ? (
                                                    <button
                                                        onClick={() => handleCashout(payment)}
                                                        disabled={cashoutMutation.isLoading}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                                                    >
                                                        {cashoutMutation.isLoading ? "Processing..." : "Cash Out"}
                                                    </button>
                                                ) : (
                                                    <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm">
                                                        Cashed Out
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Completed Deliveries History */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-800">Delivery History</h2>
                    </div>
                    
                    {completedParcels.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Completed Deliveries</h3>
                            <p className="text-gray-500">Your completed deliveries will appear here</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Tracking ID</th>
                                        <th className="py-3 px-4 text-left">Receiver</th>
                                        <th className="py-3 px-4 text-left">Delivery Fare</th>
                                        <th className="py-3 px-4 text-left">Your Earnings</th>
                                        <th className="py-3 px-4 text-left">Delivered Date</th>
                                        <th className="py-3 px-4 text-left">Payment Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completedParcels.map((parcel) => (
                                        <tr key={parcel._id} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-4">{parcel.tracking}</td>
                                            <td className="py-3 px-4">{parcel.receiver_name}</td>
                                            <td className="py-3 px-4">${parcel.fare}</td>
                                            <td className="py-3 px-4 font-semibold text-green-600">
                                                ${(parcel.fare * 0.3).toFixed(2)}
                                            </td>
                                            <td className="py-3 px-4">
                                                {new Date(parcel.delivered_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    parcel.payment_status === 'paid' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {parcel.payment_status === 'paid' ? 'Cashed Out' : 'Pending Cashout'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompletedDelivery;