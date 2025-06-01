import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { featuredTreatments, treatments } from '../utils/data';

export const FeaturedSection = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-skin-lightgreen/30 to-skin-lightorange/20">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-serif mb-8 leading-tight text-gray-800">
              Essential for Radiant Skin
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Our skilled practitioners will tailor a treatment plan to address your specific beauty goals, 
              ensuring optimal results that enhance your natural beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button className="bg-gradient-primary text-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-medium">
                LEARN MORE
              </Button>
              <Button variant="outline" className="border-2 border-skin-teal text-skin-teal hover:bg-skin-teal hover:text-white transition-all duration-300 px-8 py-4 text-lg">
                BOOK NOW
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <iframe 
                width="100%" 
                height="350" 
                src="https://www.youtube.com/embed/BNGa9tXr2No?si=Bc_2U5ZqHnEbfjtj" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen 
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-gray-800 max-w-4xl mx-auto leading-tight">
            Best-selling essentials for a vibrant, healthy glow of your skin.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredTreatments.map(treatment => (
            <div key={treatment.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={treatment.image} 
                  alt={treatment.name} 
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-4 text-gray-800">{treatment.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{treatment.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-2xl text-skin-teal">{treatment.price}</span>
                  <Link to={`/treatments/${treatment.id}`}>
                    <Button variant="outline" className="border-skin-teal text-skin-teal hover:bg-skin-teal hover:text-white transition-all duration-300">
                      Read More
                    </Button>
                  </Link>
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
    <section className="py-32 bg-gradient-primary relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Skincare serum" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-skin-orange/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
          <div className="lg:w-2/3 text-gray-800 space-y-8">
            <h2 className="text-5xl lg:text-6xl font-serif leading-tight">
              skin care meets nature
            </h2>
            <p className="text-xl leading-relaxed opacity-90 max-w-2xl">
              unlock the secret to your inner beauty and energy with our natural skincare products
            </p>
            <Button className="bg-white text-gray-800 hover:bg-skin-orange hover:text-white transition-all duration-300 shadow-lg px-10 py-4 text-lg font-medium">
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full w-1/4 opacity-10">
        <img src="/placeholder.svg" alt="Decorative leaves" className="h-full object-cover" />
      </div>
    </section>
  );
};

export const ProductGrid = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {treatments.map(treatment => (
            <div key={treatment.id} className="bg-gradient-soft rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <img 
                src={treatment.image} 
                alt={treatment.name} 
                className="w-full h-48 object-cover rounded-xl mb-6 group-hover:scale-105 transition-transform duration-300" 
              />
              <h3 className="text-lg font-serif font-medium mb-2 text-gray-800">{treatment.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{treatment.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-skin-teal">{treatment.price}</span>
                <Link to={`/treatments/${treatment.id}`}>
                  <Button variant="outline" size="sm" className="text-xs px-3 py-2 border-skin-teal text-skin-teal hover:bg-skin-teal hover:text-white">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default {
  FeaturedSection,
  BannerSection,
  ProductGrid
};
