
import React from 'react';
import { treatments } from '../utils/data';

const categories = [...new Set(treatments.map(item => item.category))].slice(0, 3);

const ProductShowcase = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
          Find Your Perfect Match from Our Selections
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const treatment = treatments.find(t => t.category === category);
            return (
              <div key={index} className={`relative overflow-hidden rounded-lg ${
                index === 0 ? "md:col-span-2" : ""
              }`}>
                <img 
                  src={treatment?.image || "/placeholder.svg"} 
                  alt={category}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4">
                  <h3 className="text-xl font-medium">{category}</h3>
                  <p className="text-sm opacity-90 mb-2">Discover our solutions</p>
                  <a href="#" className="text-skin-green text-sm font-medium hover:underline">
                    Explore &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
