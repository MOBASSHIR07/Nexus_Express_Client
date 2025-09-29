import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import DeliveryLoader from "../../Utils/DeliveryLoader";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const PaymentForm = () => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();


    const [billing, setBilling] = useState({
        name: "",
        email: "",
        postal_code: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { parcelId } = useParams();
    console.log(parcelId);
    const axiosSecure = useAxiosInstance();

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBilling({ ...billing, [name]: value });
    };


    const { data: parcelInfo = {}, isLoading, isError } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${parcelId}`)
            return res.data;

        }
    })
    console.log(parcelInfo);
    if (isLoading) {
        return <DeliveryLoader />
    }
    if (isError) {
        return <p>{error.message}</p>
    }



    // Handle payment submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError("");
        setSuccess("");

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card element not found");
            setLoading(false);
            return;
        }

        try {
            // 1️⃣ Create PaymentIntent on backend
            const { data } = await axiosSecure.post("/create-payment-intent", {
                amount: Math.round(parcelInfo.fare * 100), // convert dollars to cents
                user: {
                    id: user?._id,
                    name: billing.name,
                    email: billing.email,
                },
                parcelId: parcelInfo._id,
            });

            const clientSecret = data.clientSecret;

            // 2️⃣ Confirm payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card,
                        billing_details: {
                            name: billing.name,
                            email: billing.email,
                            address: { postal_code: billing.postal_code },
                        },
                    },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
            } else if (paymentIntent.status === "succeeded") {
                setSuccess("Payment successful!");
                console.log("PaymentIntent:", paymentIntent);
                // 3 : update backend to mark parcel as paid

                const paymentInfo = {
                    user: {
                        id: user?._id,
                        name: billing.name,
                        email: user?.email,
                    },
                    parcelId: parcelInfo._id,
                    amount: parcelInfo.fare,
                    paymentIntentId: paymentIntent.id,
                    paymentStatus: paymentIntent.status,
                };

                await axiosSecure.post("/payments", paymentInfo);

                // ✅ Show SweetAlert with Payment ID
                Swal.fire({
                    title: "Payment Successful! 🎉",
                    text: `Payment ID: ${paymentIntent.id}`,
                    icon: "success",
                    confirmButtonText: "Go to My Parcels",
                    confirmButtonColor: "#2563eb", // Tailwind blue-600
                }).then(() => {
                    // ✅ Redirect after user confirms
                    navigate("/dashboard");
                });

                setSuccess("✅ Payment completed and saved!");
                console.log("💾 Payment saved:", paymentInfo);
            }
        } catch (err) {
            console.error("Payment error:", err);
            setError("Payment failed. Please try again.");
        }

        setLoading(false);
    };

    const cardStyle = {
        style: {
            base: {
                color: "#1f2937",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "16px",
                "::placeholder": { color: "#9ca3af" },
            },
            invalid: { color: "#ef4444" },
        },
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                💳 Complete Your Payment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={billing.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={billing.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Postal Code */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        name="postal_code"
                        value={billing.postal_code}
                        onChange={handleChange}
                        placeholder="12345"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Card Element */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Card Details
                    </label>
                    <div className="p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
                        <CardElement options={cardStyle} />
                    </div>
                </div>

                {/* Error / Success */}
                {error && (
                    <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md">
                        ⚠️ {error}
                    </p>
                )}
                {success && (
                    <p className="text-green-600 text-sm bg-green-50 p-2 rounded-md">
                        {success}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                        }`}
                >
                    {loading ? "Processing..." : `Pay ${parcelInfo.fare} $`}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
