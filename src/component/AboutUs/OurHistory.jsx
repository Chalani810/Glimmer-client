// OurHistory.jsx
import React from 'react';
import HistoryImage from '../../assets/our-history.jpg';

const OurHistory = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        
        {/* Left Side Image */}
        <div className="flex-1">
          <img
            src={HistoryImage}
            alt="Our History"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right Side Text */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-gray-600">
            Since our founding, we've been committed to quality, innovation, and customer satisfaction in event rentals.
          </p>
        </div>

      </div>
    </section>
  );
};

export default OurHistory;

