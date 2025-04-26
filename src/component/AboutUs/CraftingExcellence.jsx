import React from 'react';
// This line IMPORTS your image
import ExcellenceImage from '../../assets/au1.png';

const CraftingExcellence = () => {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">

        {/*  LEFT - Text part */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Crafting Excellence Together</h2>
          <p className="text-gray-600">
            We deliver top-quality event essentials to create unforgettable moments.
          </p>
        </div>

        {/* RIGHT - Image part */}
        <div className="flex-1">
          <img
            src={ExcellenceImage} // 👉 here is the image
            alt="Crafting Excellence"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default CraftingExcellence;

