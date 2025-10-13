import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import useAuth from "../../Hooks/useAuth";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import DeliveryLoader from "../../Utils/DeliveryLoader";

const RiderHome = () => {
  const axiosSecure = useAxiosInstance();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["rider-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/stats/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <DeliveryLoader/>

  const { parcelStats, totalEarned, dailyEarnings } = data;

  const totalParcels = parcelStats.reduce((a, b) => a + b.count, 0);
  const delivered = parcelStats.find((s) => s._id === "Delivered")?.count || 0;
  const pendingOrAccepted = parcelStats
    .filter((s) => s._id === "Pending" || s._id === "Assigned" || s._id === "Accepted")
    .reduce((a, b) => a + b.count, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">🚴 Rider Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Assigned</h3>
          <p className="text-2xl font-bold">{totalParcels}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Delivered</h3>
          <p className="text-2xl font-bold">{delivered}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Earnings</h3>
          <p className="text-2xl font-bold">${totalEarned}</p>
        </div>
      </div>

      {/* Pending / Accepted Card */}
      <div className="bg-red-100 p-4 rounded-xl shadow w-1/3">
        <h3 className="text-lg font-semibold">Pending / Accepted</h3>
        <p className="text-2xl font-bold">{pendingOrAccepted}</p>
      </div>

      {/* Line Chart - Earnings Over Time */}
      <div className="w-full h-72">
        <h3 className="text-xl font-semibold mb-4">Earnings Over Time</h3>
        <ResponsiveContainer>
          <LineChart data={dailyEarnings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RiderHome;
