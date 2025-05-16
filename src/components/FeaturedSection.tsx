
import React from 'react';
import { Button } from '@/components/ui/button';
import { featuredTreatments, treatments } from '../utils/data';

export const FeaturedSection = () => {
  return (
    <section className="section bg-skin-yellow/50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Essential for Radiant Skin</h2>
            <p className="text-gray-600 mb-8">
              Our skilled practitioners will tailor a treatment plan to address your specific beauty goals, 
              ensuring optimal results that enhance your natural beauty.
            </p>
            <div className="flex gap-4">
              <Button className="btn-primary">LEARN MORE</Button>
              <Button variant="outline">BOOK NOW</Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/BNGa9tXr2No?si=Bc_2U5ZqHnEbfjtj" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          Best-selling essentials for a vibrant, healthy glow of your skin.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTreatments.map((treatment) => (
            <div key={treatment.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src={treatment.image} 
                alt={treatment.name} 
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">{treatment.name}</h3>
                <p className="text-gray-600 mb-4">{treatment.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{treatment.price}</span>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BannerSection = () => {
  return (
    <section className="py-20 bg-skin-teal relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <img 
              src="/placeholder.svg" 
              alt="Skincare serum" 
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3 text-white">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">skin care meets nature</h2>
            <p className="mb-8 text-lg opacity-90">
              unlock the secret to your inner beauty and energy with our natural skincare products
            </p>
            <Button className="bg-white text-skin-teal hover:bg-skin-yellow hover:text-black transition-colors">
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full w-1/4">
        <img 
          src="/placeholder.svg" 
          alt="Decorative leaves" 
          className="h-full object-cover opacity-25"
        />
      </div>
    </section>
  );
};

export const ProductGrid = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="bg-skin-gray rounded-lg p-4 hover:shadow-md transition-shadow">
              <img 
                src={treatment.image} 
                alt={treatment.name} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-medium mb-1">{treatment.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{treatment.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">{treatment.price}</span>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default { FeaturedSection, BannerSection, ProductGrid };
