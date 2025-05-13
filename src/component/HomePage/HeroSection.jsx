import React from 'react';
import image5 from '../../component/HomePage/image5.jpg';
import image23 from '../../component/HomePage/image23.jpg';
import image25 from '../../component/HomePage/image25.jpg';
import image6 from '../../component/HomePage/image6.jpg';


const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center px-8 py-15">
      <div className="flex-1 space-y-6">
        <p className="text-sm text-red-500">Everything You Need to Host Unforgettable Events,All in One Place.</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Plan & Host Spectacular <span className="text-red-500 italic">Moments</span>, With Us
        </h1>
        <p className="text-gray-400">
          Don't wait!<br /> It's time to bring your dream event to life! <br />From corporate gatherings to grand celebrations, we make every occasion special.
        </p>
        <div className="flex space-x-4">
          <button className="bg-red-500 text-white px-6 py-3 rounded-md shadow">Explore More</button>
          <button className="bg-black text-white px-6 py-3 rounded-md shadow">Packages</button>
        </div>
      </div>

      {/* Right side images */}
      <div className="flex-1 flex justify-center mt-12 md:mt-0">
        <div className="grid grid-cols-2 gap-4">
          {/* Sample images - Replace src with correct ones */}
          <img src={image5} alt="event1" className="w-full rounded-lg shadow-lg" />
          <img src={image23} alt="event2" className="w-full rounded-lg shadow-lg" />
          <img src={image25} alt="event3" className="w-full rounded-lg shadow-lg" />
          <img src={image6} alt="event4" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
