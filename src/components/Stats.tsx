
import React from 'react';
import { stats } from '../utils/data';

const Stats = () => {
  return (
    <section className="bg-white py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-soft p-12 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
              <span className="text-6xl font-bold mb-4 text-gray-800 group-hover:text-skin-teal transition-colors">{stat.value}</span>
              <span className="text-gray-600 text-lg">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
