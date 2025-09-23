import React from "react";
import heroImg from "../../assets/assets/banner/location-merchant.png"; 
import marchentTop from '../../assets/assets/banner/be-a-merchant-bg.png';

const Marchent = () => {
  return (
    <section  data-aos="zoom-out-up" data-aos-duration="1200"   data-aos-easing="ease-in-out" className="py-16 bg-[#085856] relative mb-8 rounded-md ">

        <img className="absolute inset-0 " src={marchentTop} alt="" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* Left Side: Text + Buttons */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-white mb-6">
            At Nexus Pro, we ensure seamless delivery solutions that empower 
            merchants and delight customers. Join our growing network and 
            experience hassle-free logistics with trust and reliability.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
              Become a Merchant
            </button>
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition">
              Earn with Nexus Pro
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center">
          <img
            src={heroImg}
            alt="Merchant"
            className="w-full max-w-md rounded-2xl  object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Marchent;
