import React from 'react';
import bookingIcon from '../../assets/assets/banner/bookingIcon.png';


const HowItWorksSection = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <p className="text-gray-500 mt-2">
          Simple steps to get your parcels delivered without hassle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
          <img src={bookingIcon} alt="Booking" className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Booking Pick & Drop</h3>
          <p className="text-gray-600">Schedule your parcel pickup and drop with just a few clicks—fast and convenient.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
          <img src={bookingIcon} alt="Cash on Delivery" className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
          <p className="text-gray-600">Offer customers the option to pay at delivery, ensuring trust and flexibility.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
          <img src={bookingIcon} alt="Delivery Hub" className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Delivery Hub</h3>
          <p className="text-gray-600">All parcels are processed through our secure hubs for fast and reliable delivery.</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
          <img src={bookingIcon} alt="SME & Corporate" className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">SME & Corporate</h3>
          <p className="text-gray-600">We support small businesses and corporate clients with tailored delivery solutions.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
