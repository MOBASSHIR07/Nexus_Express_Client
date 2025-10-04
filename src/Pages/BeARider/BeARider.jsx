import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import rider from "../../assets/assets/banner/agent-pending.png";

const BeARider = () => {
  const warehouses = useLoaderData();
  const regions = [...new Set(warehouses.map(({ region }) => region))];
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const region = watch("region");
  const districts = warehouses
    .filter((w) => w.region === region)
    .map((w) => w.district);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      email: user?.email,
      date: new Date().toISOString(),
      status: "Pending", 
      current_status:"available"
    };

    axiosInstance
      .post("/nexus/api/riders", riderData)
      .then((res) => {
        toast.success("🎉 Application submitted successfully!");
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Something went wrong. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 p-6 flex items-center justify-center">
      <ToastContainer position="top-center" />
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              🏍️ Become a Rider
            </h1>
            <p className="text-gray-600 mt-2">
              Fill out the form below to apply as a delivery rider.
            </p>
          </div>
          <img
            src={rider}
            alt="Rider Illustration"
            className="w-40 md:w-48 mt-6 md:mt-0"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Info */}
          <fieldset className="border border-gray-200 rounded-xl p-4">
            <legend className="text-xl font-semibold text-gray-700 px-2">
              Personal Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Name */}
              <label className="block">
                <span className="text-gray-700 font-medium">Full Name</span>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your full name"
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm 
                  focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </label>

              {/* Age */}
              <label className="block">
                <span className="text-gray-700 font-medium">Age</span>
                <input
                  type="number"
                  min="18"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 18, message: "You must be 18 or older" },
                  })}
                  placeholder="Enter your age"
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm 
                  focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                />
                {errors.age && (
                  <span className="text-red-500 text-sm">
                    {errors.age.message}
                  </span>
                )}
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-gray-700 font-medium">Email</span>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                />
              </label>

              {/* Contact */}
              <label className="block">
                <span className="text-gray-700 font-medium">Contact Number</span>
                <input
                  type="tel"
                  {...register("contact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^\d{10,15}$/,
                      message: "Invalid contact number",
                    },
                  })}
                  placeholder="e.g., 017XXXXXXXX"
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm 
                  focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                />
                {errors.contact && (
                  <span className="text-red-500 text-sm">
                    {errors.contact.message}
                  </span>
                )}
              </label>
            </div>
          </fieldset>

          {/* Identification */}
          <fieldset className="border border-gray-200 rounded-xl p-4">
            <legend className="text-xl font-semibold text-gray-700 px-2">
              Identification
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700 font-medium">NID Number</span>
                <input
                  type="text"
                  {...register("nid", {
                    required: "NID number is required",
                    pattern: {
                      value: /^\d{10,17}$/,
                      message: "Invalid NID number",
                    },
                  })}
                  placeholder="Enter your NID number"
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm 
                  focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                />
                {errors.nid && (
                  <span className="text-red-500 text-sm">
                    {errors.nid.message}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Address</span>
                <textarea
                  {...register("address", { required: "Address is required" })}
                  rows="3"
                  placeholder="Enter your full address"
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm 
                  focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address.message}
                  </span>
                )}
              </label>
            </div>
          </fieldset>

          {/* Location */}
          <fieldset className="border border-gray-200 rounded-xl p-4">
            <legend className="text-xl font-semibold text-gray-700 px-2">
              Location
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Region */}
              <label className="block">
                <span className="text-gray-700 font-medium">Region</span>
                <select
                  {...register("region", { required: "Region is required" })}
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm 
                  focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                >
                  <option value="">Select a region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <span className="text-red-500 text-sm">
                    {errors.region.message}
                  </span>
                )}
              </label>

              {/* District */}
              <label className="block">
                <span className="text-gray-700 font-medium">District</span>
                <select
                  {...register("district", { required: "District is required" })}
                  disabled={!region}
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm 
                  focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                >
                  <option value="">Select a district</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <span className="text-red-500 text-sm">
                    {errors.district.message}
                  </span>
                )}
              </label>
            </div>
          </fieldset>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-3 bg-[#9ACD32] text-white font-bold rounded-xl shadow-lg 
              hover:bg-green-600 transition-all duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeARider;
