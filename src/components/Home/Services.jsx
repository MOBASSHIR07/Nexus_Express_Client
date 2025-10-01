import React from 'react';
import {
    FiPackage,
    FiTruck,
    FiLayers,
    FiDollarSign,
    FiBriefcase,
    FiRotateCw,
} from "react-icons/fi";
import DeliveryLoader from '../../Utils/DeliveryLoader';

const services = [
    {
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: <FiPackage className="text-4xl text-green-500" />,
    },
    {
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: <FiTruck className="text-4xl text-green-500" />,
    },
    {
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: <FiLayers className="text-4xl text-green-500" />,
    },
    {
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: <FiDollarSign className="text-4xl text-green-500" />,
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
        icon: <FiBriefcase className="text-4xl text-green-500" />,
    },
    {
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: <FiRotateCw className="text-4xl text-green-500" />,
    },
];

const Services = () => {
    return (
        <section className="bg-[#085856] py-16 rounded-md max-w-7xl mx-auto my-16">
            <div className="text-center mb-12 text-white">
                <h2 className="text-4xl font-bold">Our Services</h2>
                <p className="mt-2">Explore the wide range of logistics solutions we provide</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="group relative rounded-2xl shadow-md p-6 text-center bg-white overflow-hidden"
                        style={{
                            background: 'white',
                            transition: 'background-size 1.5s ease-in-out',
                            backgroundSize: '0% 0%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundImage = 'radial-gradient(circle, #e6ec76 0%, #e6ec76 100%)';
                            e.currentTarget.style.backgroundSize = '200% 200%';
                        }}
                        onMouseLeave={(e) => {
                            const target = e.currentTarget;
                            e.currentTarget.style.backgroundSize = '0% 0%';
                            // Optional: remove background after transition ends
                            setTimeout(() => {
                                e.currentTarget.style.backgroundImage = 'none';
                            }, 1000); // match transition duration
                        }}
                    >
                        <div className="relative z-10">
                            <div className="flex justify-center mb-4 transition-colors duration-500">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          
            
        </section>
        
    );
};

export default Services;