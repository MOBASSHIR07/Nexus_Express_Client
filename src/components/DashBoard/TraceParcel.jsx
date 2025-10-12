import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import DeliveryLoader from "../../Utils/DeliveryLoader";

const TraceParcel = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosInstance();

  // Fetch tracking info
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["parcel-tracking", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/tracking/${parcelId}`);
      return res.data;
    },
    enabled: !!parcelId,
  });

  if (isLoading) return <DeliveryLoader />;

  if (isError)
    return (
      <div className="text-red-600 text-center py-8">
        Failed to load tracking info: {error.message}
      </div>
    );

  const steps = data?.steps || [];

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
          Tracking Parcel:{" "}
          <span className="text-blue-600">{data?.trackingNumber}</span>
        </h2>

        {steps.length === 0 ? (
          <p className="text-gray-600 text-center">
            No tracking steps available yet.
          </p>
        ) : (
          <div className="relative border-l-4 border-gray-200 pl-6">
            {steps.map((step, index) => {
              const isCompleted = index < steps.length - 1;
              const isCurrent = index === steps.length - 1;

              return (
                <motion.div
                  key={index}
                  className="mb-10 last:mb-0 relative flex flex-col sm:flex-row sm:items-start"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[11px] w-5 h-5 rounded-full border-4 transition-all duration-300 ${
                      isCurrent
                        ? "border-blue-600 bg-white"
                        : isCompleted
                        ? "border-green-500 bg-white"
                        : "border-gray-300 bg-gray-100"
                    }`}
                  ></div>

                  {/* Content */}
                  <motion.div
                    className="ml-4 sm:ml-6 bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm text-gray-500">
                      {new Date(step.timestamp).toLocaleString()}
                    </p>
                    <h3
                      className={`font-semibold text-lg ${
                        isCurrent
                          ? "text-blue-700"
                          : isCompleted
                          ? "text-green-700"
                          : "text-gray-700"
                      }`}
                    >
                      {step.step}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                    {step.location && (
                      <p className="text-gray-400 text-sm mt-1">
                        Location: {step.location}
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TraceParcel;
