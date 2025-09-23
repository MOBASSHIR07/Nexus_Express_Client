import React from 'react';
import { useForm } from "react-hook-form";
import loginBanner from '../../../assets/assets/banner/authImage.png'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left side: Visuals */}
      <div className="hidden lg:flex w-1/2 justify-center items-center bg-[#085856] p-8 relative overflow-hidden">
        <img
          src={loginBanner}
          alt="Login banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="text-white text-center z-10 p-4">
          <h1 className="text-4xl font-bold tracking-wider drop-shadow-md">Welcome Back</h1>
          <p className="mt-4 text-lg drop-shadow-sm">Your journey to success begins here. Login to get started.</p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 bg-white">
        <div className="w-full max-w-sm px-6 py-12 rounded-lg shadow-xl bg-white">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-500">Access your account securely</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                })}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#085856] focus:border-transparent transition"
              />
              {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#085856] focus:border-transparent transition"
              />
              {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
            </div>
            
            <div className="text-right">
              <a href="#" className="text-sm font-medium text-[#085856] hover:underline">Forgot password?</a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#085856] text-white py-2 rounded-md font-semibold hover:bg-[#0a6c69] transition"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account? {' '}
            <a href="/register" className="text-[#085856] font-semibold hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;