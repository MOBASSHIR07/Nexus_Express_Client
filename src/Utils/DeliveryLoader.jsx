import React from 'react';

const DeliveryLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      {/* Main Loading Animation */}
      <div className="relative">
        {/* Delivery truck container */}
        <div className="relative w-80 h-20 mx-auto mb-6 bg-gray-100 rounded-lg overflow-hidden">
          {/* Road */}
          <div className="absolute bottom-0 w-full h-2 bg-gray-300"></div>
          <div
            className="absolute bottom-0 w-full h-1 bg-yellow-400 opacity-60"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, transparent, transparent 10px, #facc15 10px, #facc15 20px)',
              animation: 'roadAnimation 2s linear infinite',
            }}
          ></div>

          {/* Truck */}
          <div
            className="absolute bottom-2 animate-pulse"
            style={{
              animation: 'truckMove 4s ease-in-out infinite',
            }}
          >
            <div className="relative">
              {/* Truck body */}
              <div className="w-16 h-10 bg-blue-600 rounded-lg shadow-md relative">
                {/* Cargo area */}
                <div className="absolute top-0 right-0 w-10 h-10 bg-blue-700 rounded-r-lg"></div>
                {/* Cabin */}
                <div className="absolute top-0 left-0 w-6 h-8 bg-blue-500 rounded-l-lg"></div>
                {/* Window */}
                <div className="absolute top-1 left-1 w-4 h-3 bg-sky-100 rounded border"></div>
                {/* Logo on truck */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
              </div>

              {/* Wheels */}
              <div className="absolute -bottom-1 left-1 w-4 h-4 bg-gray-800 rounded-full">
                <div className="absolute inset-0.5 border border-gray-400 rounded-full animate-spin"></div>
              </div>
              <div className="absolute -bottom-1 right-1 w-4 h-4 bg-gray-800 rounded-full">
                <div className="absolute inset-0.5 border border-gray-400 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>

          {/* Floating packages */}
          <div
            className="absolute top-4 left-8 w-3 h-3 bg-orange-400 rounded animate-bounce"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="absolute top-6 left-16 w-2 h-2 bg-green-400 rounded animate-bounce"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute top-3 left-24 w-3 h-3 bg-purple-400 rounded animate-bounce"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes truckMove {
          0% {
            transform: translateX(-20px);
          }
          50% {
            transform: translateX(280px);
          }
          100% {
            transform: translateX(-20px);
          }
        }

        @keyframes roadAnimation {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 20px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DeliveryLoader;
