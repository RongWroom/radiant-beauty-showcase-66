
import React from 'react';
import { stats } from '../utils/data';

const Stats = () => {
  return (
    <section className="section bg-section-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              <div className="text-4xl md:text-5xl font-serif font-bold text-brand-sage">
                {stat.number}
              </div>
              <div className="text-hierarchy-secondary text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
