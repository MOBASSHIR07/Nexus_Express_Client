import React from 'react';
import { useForm } from "react-hook-form";
import registerBanner from '../../../assets/assets/banner/authImage.png';
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import useAuth from '../../../Hooks/useAuth';
import GoogleLogin from '../SocialLogin/GoogleLogin';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {createUser} = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result =>{
      console.log(result.user);
    })
    .catch(err=>{console.log(err);})
  };

  // Watch password field
  const password = watch("password");

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 justify-center items-center bg-[#085856] p-8 relative overflow-hidden">
        <img
          src={registerBanner}
          alt="Register banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="text-white text-center z-10 p-4">
          <h1 className="text-4xl font-bold tracking-wide drop-shadow-md">Join Us Today</h1>
          <p className="mt-4 text-lg drop-shadow-sm">
            Create your account and start your journey with us.
          </p>
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
                  placeholder="John Doe"
                  {...register("name", { required: "Full name is required" })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#085856] focus:border-transparent transition"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-2">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                  })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#085856] focus:border-transparent transition"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-2">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#085856] focus:border-transparent transition"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative mt-2">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#085856] focus:border-transparent transition"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#085856] to-[#0a6c69] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#085856] font-semibold hover:underline">Login</a>
          </p>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
