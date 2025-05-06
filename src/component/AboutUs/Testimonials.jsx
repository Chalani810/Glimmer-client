// Testimonials.jsx
import React from 'react';
import Testimonial1 from '../../assets/testimonial-1.jpg';
import Testimonial2 from '../../assets/testimonial-2.jpg';

const Testimonials = () => {
  return (
    <section className="py-12 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">What People Say About Glimmer</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={Testimonial1} alt="Customer 1" className="w-16 h-16 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 mb-2">
              "Glimmer made our event magical! Their service was excellent and seamless."
            </p>
            <h3 className="font-bold">Sarah Johnson</h3>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={Testimonial2} alt="Customer 2" className="w-16 h-16 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 mb-2">
              "Everything was beautiful and perfectly set up. Highly recommend Glimmer!"
            </p>
            <h3 className="font-bold">Daniel Martinez</h3>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
