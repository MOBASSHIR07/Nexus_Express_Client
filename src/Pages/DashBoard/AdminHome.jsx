import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { motion } from "framer-motion";
import DeliveryLoader from "../../Utils/DeliveryLoader";

const COLORS = ["#82ca9d", "#8884d8", "#ffc658", "#d45079"];

const AdminHome = () => {
  const axiosSecure = useAxiosInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <DeliveryLoader/>

  const { parcelSummary, paymentSummary, topRegions, riderPerformance, pendingAssignedAccepted } = data;

  const totalParcels = parcelSummary.reduce((a, b) => a + b.count, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-2xl font-bold">${paymentSummary.totalEarnings}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Parcels</h3>
          <p className="text-2xl font-bold">{totalParcels}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Transactions</h3>
          <p className="text-2xl font-bold">{paymentSummary.totalTransactions}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Pending / Assigned / Accepted</h3>
          <p className="text-2xl font-bold">
            {pendingAssignedAccepted.reduce((a, b) => a + b.count, 0)}
          </p>
        </div>
      </div>

      {/* Pie Chart - Parcel Status */}
      <div className="w-full h-72">
        <h3 className="text-xl font-semibold mb-4">Parcel Status Distribution</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={parcelSummary} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={100} label>
              {parcelSummary.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Rider Performance */}
      <div className="w-full h-72">
        <h3 className="text-xl font-semibold mb-4">Top Rider Performance</h3>
        <ResponsiveContainer>
          <BarChart data={riderPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="delivered" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Regions */}
      <div className="w-full h-72">
        <h3 className="text-xl font-semibold mb-4">Top Sender Regions</h3>
        <ResponsiveContainer>
          <BarChart data={topRegions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AdminHome;
