import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";
import useAxiosInstance from "../../Hooks/useAxiosInstance";

// Fare calculation logic
const calculateFare = (isDocument, weight) => {
  const baseDocumentFare = 50;
  const baseParcelFare = 100;
  const parcelRatePerKg = 20;

  return isDocument ? baseDocumentFare : baseParcelFare + (weight > 0 ? weight * parcelRatePerKg : 0);
};

// Simple tracking number generator
const generateTrackingNumber = () => `TRK-${Math.floor(100000 + Math.random() * 900000)}`;


const SendParcel = () => {
  const warehouses = useLoaderData();
  const regions = [...new Set(warehouses.map(({ region }) => region))];

  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { type: "documents", weight: "" },
  });

  const [fare, setFare] = useState(0);

  // Watch dynamic fields
  const parcelKind = watch("type");
  const weight = watch("weight", "");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  // Compute districts based on selected region
  const senderDistricts = warehouses.filter(w => w.region === senderRegion).map(w => w.district);
  const receiverDistricts = warehouses.filter(w => w.region === receiverRegion).map(w => w.district);

  // Update fare whenever parcel type or weight changes
  useEffect(() => {
    const isDoc = parcelKind === "documents";
    setFare(calculateFare(isDoc, Number(weight) || 0));

    if (isDoc && weight !== "") setValue("weight", "");
  }, [parcelKind, weight, setValue]);

  const onSubmit = (data) => {
    const tracking = generateTrackingNumber();
    toast.success(`Parcel submitted! Fare: $${fare}, Tracking: ${tracking}`, { autoClose: 5000 });

    const parcels = {
      ...data,
      fare,
      tracking,
      email: user?.email,
      payment_status: "Pending",
      delivery_status: "Processing",
      date: new Date().toISOString(),
    };
    axiosInstance.post('/nexus/api/parcels', parcels)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 flex items-center justify-center">
      <ToastContainer position="top-center" />
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">🚚 Send Your Parcel</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Type */}
          <fieldset className="border border-gray-200 rounded-xl p-4">
            <legend className="text-xl font-semibold text-gray-700 px-2">Parcel Type</legend>
            <div className="flex items-center space-x-8 mt-2">
              {["documents", "parcel"].map(type => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register("type")}
                    value={type}
                    className="form-radio text-[#9ACD32] h-5 w-5"
                    defaultChecked={type === "documents"}
                  />
                  <span className="ml-2 text-gray-700 font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Parcel Info */}
          <fieldset className="border border-gray-200 rounded-xl p-4">
            <legend className="text-xl font-semibold text-gray-700 px-2">Parcel Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <label className="block">
                <span className="text-gray-700 font-medium">Weight (kg)</span>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  {...register("weight", {
                    validate: val => (parcelKind === "parcel" ? parseFloat(val) > 0 || "Weight must be > 0" : true)
                  })}
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                  disabled={parcelKind === "documents"}
                />
                {errors.weight && <span className="text-red-500 text-sm">{errors.weight.message}</span>}
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Parcel Description</span>
                <input
                  type="text"
                  {...register("parcel_type", { required: "Parcel description is required." })}
                  placeholder="e.g., Electronics, Clothes"
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                />
                {errors.parcel_type && <span className="text-red-500 text-sm">{errors.parcel_type.message}</span>}
              </label>

              <label className="md:col-span-2 block">
                <span className="text-gray-700 font-medium">Special Instructions</span>
                <textarea
                  {...register("instructions")}
                  placeholder="Handle with care, call before delivery"
                  rows="3"
                  className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                />
              </label>
            </div>
          </fieldset>

          {/* Sender & Receiver */}
          <fieldset className="border border-gray-200 rounded-xl p-4">
            <legend className="text-xl font-semibold text-gray-700 px-2">Sender & Receiver</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
              {["sender", "receiver"].map(person => {
                const region = watch(`${person}_region`);
                const districts = person === "sender" ? senderDistricts : receiverDistricts;
                return (
                  <div key={person}>
                    <h3 className="font-semibold text-gray-600 mb-3">{person.charAt(0).toUpperCase() + person.slice(1)}</h3>
                    {["name", "phone", "address"].map(field => (
                      <label key={field} className="block mt-3">
                        <span className="text-gray-700 font-medium">{field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}</span>
                        {field === "address" ? (
                          <textarea
                            {...register(`${person}_${field}`, { required: `${person} ${field} is required.` })}
                            rows="3"
                            className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                          />
                        ) : (
                          <input
                            type={field === "phone" ? "tel" : "text"}
                            {...register(`${person}_${field}`, {
                              required: `${person} ${field} is required.`,
                              pattern: field === "phone" ? { value: /^\d{10,15}$/, message: "Invalid phone number." } : undefined,
                            })}
                            className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                          />
                        )}
                        {errors[`${person}_${field}`] && <span className="text-red-500 text-sm">{errors[`${person}_${field}`]?.message}</span>}
                      </label>
                    ))}

                    {/* Region & District */}
                    <label className="block mt-3">
                      <span className="text-gray-700 font-medium">Region</span>
                      <select
                        {...register(`${person}_region`, { required: `${person} region is required.` })}
                        className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                      >
                        <option value="">Select a region</option>
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      {errors[`${person}_region`] && <span className="text-red-500 text-sm">{errors[`${person}_region`]?.message}</span>}
                    </label>

                    <label className="block mt-3">
                      <span className="text-gray-700 font-medium">District</span>
                      <select
                        {...register(`${person}_district`, { required: `${person} district is required.` })}
                        disabled={!region}
                        className="mt-2 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:border-[#9ACD32] focus:ring-[#9ACD32]"
                      >
                        <option value="">Select a district</option>
                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors[`${person}_district`] && <span className="text-red-500 text-sm">{errors[`${person}_district`]?.message}</span>}
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>

          {/* Fare */}
          <div className="bg-green-50 p-6 rounded-xl text-center shadow-inner">
            <p className="text-gray-700 text-lg font-bold">
              Calculated Fare: <span className="text-[#9ACD32] text-2xl font-extrabold">${fare}</span>
            </p>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-3 bg-[#9ACD32] text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition-all duration-200"
            >
              Confirm & Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
