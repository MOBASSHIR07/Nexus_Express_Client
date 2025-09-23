import React from "react";
import { motion } from "framer-motion";
import { FiTruck, FiPackage, FiRotateCw } from "react-icons/fi";

const benefits = [
  {
    icon: <FiTruck className="text-5xl text-green-600" />,
    title: "Fast Nationwide Delivery",
    description:
      "Get your products delivered to every district within 48–72 hours with full tracking support.",
  },
  {
    icon: <FiPackage className="text-5xl text-green-600" />,
    title: "Secure Packaging",
    description:
      "We ensure safe packaging so your products arrive at the customer’s door without damage.",
  },
  {
    icon: <FiRotateCw className="text-5xl text-green-600" />,
    title: "Easy Returns",
    description:
      "Our reverse logistics system allows hassle-free product returns and exchanges for customers.",
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Benefit = () => {
  return (
    <section className="py-16 bg-white max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12 text-gray-800"
      >
        Why Choose Us
      </motion.h2>

      <div className="space-y-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex items-center bg-gray-50 shadow-md rounded-xl p-6"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true }}
          >
            {/* Left Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex-shrink-0 flex items-center justify-center w-24 h-24 bg-white rounded-full shadow"
            >
              {benefit.icon}
            </motion.div>

            {/* Vertical Dotted Divider */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-6 h-20 border-l-2 border-dotted border-gray-400 origin-top"
            ></motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Benefit;
