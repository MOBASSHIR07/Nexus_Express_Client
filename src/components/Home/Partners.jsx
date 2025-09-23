import React from "react";
import Marquee from "react-fast-marquee";

// Import your logos from assets
import logo1 from "../../assets/assets/brands/amazon.png";
import logo2 from "../../assets/assets/brands/amazon_vector.png";
import logo3 from "../../assets/assets/brands/casio.png";
import logo4 from "../../assets/assets/brands/moonstar.png";
import logo5 from "../../assets/assets/brands/randstad.png";
import logo6 from "../../assets/assets/brands/start-people 1.png";
import logo7 from "../../assets/assets/brands/start.png";


const logos = [logo1, logo2, logo3, logo4, logo5, logo6,logo7];

const Partners = () => {
  return (
    <section className="py-8">
      {/* Heading */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-[#085856]">
          We’ve helped thousands of sales teams
        </h3>
      </div>

      {/* Marquee */}
      <Marquee
        gradient={true} 
        speed={50} 
        pauseOnHover={true} 
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-12">
            <img
              src={logo}
              alt={`Partner ${index}`}
              className="h-8 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Partners;
