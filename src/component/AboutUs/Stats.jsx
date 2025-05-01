// components/AboutUs/Stats.jsx
import React from 'react';

const Stats = () => {
  const stats = [
    { number: '150+', label: 'Complete Projects' },
    { number: '25+', label: 'Team Members' },
    { number: '200+', label: 'Client Reviews' },
    { number: '12', label: 'Winning Awards' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="w-40">
            <h3 className="text-4xl font-bold text-red-500">{stat.number}</h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;


