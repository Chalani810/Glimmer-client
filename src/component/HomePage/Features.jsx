import React from 'react';
import cateringImg from '../../component/HomePage/image30.jpg';
import planningImg from '../../component/HomePage/image37.jpg';
import venueImg from '../../component/HomePage/image10.jpg';

const features = [
  {
    title: "Best Catering Equipments & Tools",
    description: "From elegant serving sets to essential kitchen gear, we provide premium catering tools to elevate every event.",
    image: cateringImg,
  },
  {
    title: "Event Essentials & Furniture Rentals",
    description: "Create the perfect setting with our curated collection of event furniture and essentials, designed for comfort and style.",
    image: planningImg,
  },
  {
    title: "Stylish Event Decor Rentals",
    description: "Add charm and character to your celebration with our thoughtfully selected decor pieces from lanterns to luxe carpets.",
    image: venueImg,
  },
];

const Features = () => {
  return (
    <section className="px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Welcome To <span className="text-red-500">Glimmer Events!</span></h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
  {features.map((feature, idx) => (
    <div key={idx} className="max-w-sm p-6 bg-white rounded-lg shadow-md text-center">
      <img src={feature.image} alt={feature.title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  ))}
</div>
    </section>
  );
};

export default Features;
