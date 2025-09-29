import React from 'react';
import { useForm } from "react-hook-form";
import registerBanner from '../../../assets/assets/banner/authImage.png';
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import useAuth from '../../../Hooks/useAuth';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    createUser(data.email, data.password, data.name)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 justify-center items-center bg-[#085856] p-8 relative overflow-hidden">
        <img src={registerBanner} alt="Register banner" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="text-white text-center z-10 p-4">
          <h1 className="text-4xl font-bold">Join Us Today</h1>
          <p className="mt-4 text-lg">Create your account and start your journey with us.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md px-6 py-12 rounded-lg shadow-xl bg-white">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-500">It only takes a few minutes</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative mt-2">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  {...register("name", { required: "Full name is required" })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-2">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-2">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative mt-2">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) => value === password || "Passwords do not match"
                  })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            {/* Button */}
            <button type="submit" className="w-full bg-[#085856] text-white py-2 rounded-md font-semibold">
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#085856] font-semibold hover:underline">Login</a>
          </p>

          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
