import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import DeliveryLoader from "../../Utils/DeliveryLoader";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosInstance();

    const { data: paymentHistory = [], isLoading } = useQuery({
        queryKey: ["paymentHistory", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentHistory?email=${user.email}`);
            return res.data;
        },
    });


    if (isLoading) {
        return <DeliveryLoader />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                💳 Payment History
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Payment ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Parcel ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Amount ($)
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Status
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paymentHistory.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-4 py-4 text-center text-gray-500"
                                >
                                    No payment history found.
                                </td>
                            </tr>
                        ) : (
                            paymentHistory.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {payment.paymentIntentId}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {payment.parcelId}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {payment.amount.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-sm font-medium text-gray-700">
                                        {payment.paymentStatus === "succeeded" ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                                {payment.paymentStatus}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-500">
                                        {new Date(payment.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
