import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import useAuth from "../../Hooks/useAuth";

const MyEarnings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosInstance();

    // Fetch all payment data for analysis
    const { data: earningsData, isLoading } = useQuery({
        queryKey: ["rider-earnings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/earnings-analysis?rider_email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading earnings data...</div>
            </div>
        );
    }

    const {
        today_earning = 0,
        week_earning = 0,
        month_earning = 0,
        total_earning = 0,
        pending_amount = 0,
        total_cashout = 0,
        completed_deliveries = 0,
        pending_deliveries = 0,
        earnings_trend = [],
        recent_cashouts = []
    } = earningsData || {};

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">My Earnings</h1>
                <p className="text-gray-600 mb-8">Track your delivery earnings and performance</p>

                {/* Main Earnings Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Today's Earnings */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Today's Earnings</p>
                                <p className="text-2xl font-bold text-gray-800 mt-2">${today_earning.toFixed(2)}</p>
                            </div>
                            <div className="text-blue-500 text-2xl">📦</div>
                        </div>
                        <p className="text-green-600 text-sm mt-2">+30% from yesterday</p>
                    </div>

                    {/* This Week */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">This Week</p>
                                <p className="text-2xl font-bold text-gray-800 mt-2">${week_earning.toFixed(2)}</p>
                            </div>
                            <div className="text-green-500 text-2xl">💰</div>
                        </div>
                        <p className="text-green-600 text-sm mt-2">{Math.round((week_earning / 7) * 100) / 100}/day avg</p>
                    </div>

                    {/* This Month */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">This Month</p>
                                <p className="text-2xl font-bold text-gray-800 mt-2">${month_earning.toFixed(2)}</p>
                            </div>
                            <div className="text-purple-500 text-2xl">📊</div>
                        </div>
                        <p className="text-green-600 text-sm mt-2">On track for ${(month_earning * 1.1).toFixed(2)}</p>
                    </div>

                    {/* Total Earnings */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Total Earnings</p>
                                <p className="text-2xl font-bold text-gray-800 mt-2">${total_earning.toFixed(2)}</p>
                            </div>
                            <div className="text-yellow-500 text-2xl">🏆</div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">All time delivery income</p>
                    </div>
                </div>

                {/* Secondary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Pending Amount */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Pending Cashout</p>
                                <p className="text-2xl font-bold text-yellow-600 mt-2">${pending_amount.toFixed(2)}</p>
                            </div>
                            <div className="text-yellow-500 text-2xl">⏳</div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">Available for withdrawal</p>
                    </div>

                    {/* Total Cashed Out */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Total Cashed Out</p>
                                <p className="text-2xl font-bold text-green-600 mt-2">${total_cashout.toFixed(2)}</p>
                            </div>
                            <div className="text-green-500 text-2xl">💳</div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">Successfully withdrawn</p>
                    </div>

                    {/* Delivery Stats */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Completed Deliveries</p>
                                <p className="text-2xl font-bold text-blue-600 mt-2">{completed_deliveries}</p>
                            </div>
                            <div className="text-blue-500 text-2xl">✅</div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">{pending_deliveries} pending deliveries</p>
                    </div>
                </div>

                {/* Earnings Trend & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Earnings Trend (Last 7 Days) */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Earnings Trend (Last 7 Days)</h3>
                        <div className="space-y-3">
                            {earnings_trend.length > 0 ? (
                                earnings_trend.map((day, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-gray-600">{day.date}</span>
                                        <span className="font-semibold text-green-600">${day.amount.toFixed(2)}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No earnings data available</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Cashouts */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Cashouts</h3>
                        <div className="space-y-3">
                            {recent_cashouts.length > 0 ? (
                                recent_cashouts.map((cashout, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-2">
                                        <div>
                                            <p className="font-semibold">${cashout.amount.toFixed(2)}</p>
                                            <p className="text-gray-500 text-sm">{cashout.date}</p>
                                        </div>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                            Completed
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No cashout history</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white p-6 rounded-xl shadow-md mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{completed_deliveries}</p>
                            <p className="text-gray-600 text-sm">Total Deliveries</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">${(total_earning / completed_deliveries || 0).toFixed(2)}</p>
                            <p className="text-gray-600 text-sm">Avg per Delivery</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">{Math.round((completed_deliveries / (completed_deliveries + pending_deliveries)) * 100) || 0}%</p>
                            <p className="text-gray-600 text-sm">Completion Rate</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-600">${(total_earning / 30).toFixed(2)}</p>
                            <p className="text-gray-600 text-sm">Daily Average</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEarnings;