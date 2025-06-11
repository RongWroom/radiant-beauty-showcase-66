
import React from 'react';
import { stats } from '../utils/data';

const Stats = () => {
  return (
    <section className="bg-section-light section">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group border border-brand-neutral-200">
              <span className="text-6xl font-bold mb-6 text-hierarchy-primary group-hover:text-brand-sage transition-colors">{stat.value}</span>
              <span className="text-hierarchy-secondary text-lg font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
