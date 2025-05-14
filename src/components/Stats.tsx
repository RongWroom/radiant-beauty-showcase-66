
import React from 'react';
import { stats } from '../utils/data';

const Stats = () => {
  return (
    <section className="bg-skin-lightgreen py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <span className="text-5xl font-bold mb-2">{stat.value}</span>
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
