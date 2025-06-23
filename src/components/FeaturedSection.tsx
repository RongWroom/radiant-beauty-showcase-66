import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { featuredTreatments, treatments } from '../utils/data';
export const FeaturedSection = () => {
  return <section className="section bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16 sm:gap-20 lg:gap-24 items-center mb-20 sm:mb-24 lg:mb-32">
          <div className="lg:w-1/2 mobile-spacing-lg text-center lg:text-left">
            <h2 className="mobile-text-2xl font-serif font-semibold text-hierarchy-primary">
              Essential for Radiant Skin
            </h2>
            <p className="text-hierarchy-secondary mobile-text-base">Our skilled practitioners will tailor a treatment plan to address your specific beauty goals, ensuring the best results to enhance your natural beauty.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6">
              <Link to="/about" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto btn-primary mobile-text-base py-4 px-8 min-h-[56px] rounded-lg font-semibold">
                  LEARN MORE
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto btn-secondary mobile-text-base py-4 px-8 min-h-[56px] rounded-lg font-semibold">
                  BOOK NOW
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-brand-gray-200">
              <iframe width="100%" height="350" src="https://www.youtube.com/embed/BNGa9tXr2No?si=Bc_2U5ZqHnEbfjtj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded-2xl" />
            </div>
          </div>
        </div>
        
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="mobile-text-2xl font-serif text-hierarchy-primary max-w-5xl mx-auto">Best-selling treatments for a vibrant, healthy glow of your skin.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {featuredTreatments.map(treatment => <div key={treatment.id} className="card-featured rounded-3xl overflow-hidden group border border-brand-gray-200">
              <div className="relative overflow-hidden">
                <img src={treatment.image} alt={treatment.name} className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="mobile-text-lg font-serif font-semibold mb-4 text-hierarchy-primary">{treatment.name}</h3>
                <p className="text-hierarchy-secondary mb-8 mobile-text-sm">{treatment.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold mobile-text-lg text-brand-slate-blue">{treatment.price}</span>
                  <Link to={`/treatments/${treatment.id}`}>
                    <Button className="btn-secondary py-3 px-6 min-h-[48px] font-semibold">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export const BannerSection = () => {
  return <section className="section bg-section-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle blush gradient diagonally from left-bottom to right-top */}
        <div className="w-full h-full bg-gradient-to-tr from-brand-silver-light/30 via-white to-white" />
      </div>
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 sm:gap-20">
          <div className="lg:w-1/3">
            <div className="relative">
              <img src="/placeholder.svg" alt="Skincare serum" className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-lg" />
              <div className="absolute inset-0 bg-white/15 rounded-3xl"></div>
            </div>
          </div>
          <div className="lg:w-2/3 mobile-spacing-lg text-center lg:text-left">
            <h2 className="mobile-text-2xl font-serif font-semibold text-brand-charcoal">
              Skin Care Meets Nature
            </h2>
            <p className="mobile-text-base max-w-2xl text-hierarchy-secondary my-0">
              Unlock the secret to your inner beauty and energy with our natural skincare products
            </p>
            <Link to="/products">
              <Button className="bg-brand-slate-blue text-white hover:bg-brand-slate-blue-light transition-all duration-300 shadow-lg px-10 py-4 mobile-text-base font-semibold min-h-[56px] rounded-lg">
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full w-1/4 opacity-10 pointer-events-none" aria-hidden="true">
        <img src="/placeholder.svg" alt="Decorative leaves" className="h-full object-cover" />
      </div>
    </section>;
};
export const ProductGrid = () => {
  return <section className="section bg-section-light">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {treatments.map(treatment => <div key={treatment.id} className="bg-white rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-brand-neutral-200">
              <img src={treatment.image} alt={treatment.name} className="w-full h-48 object-cover rounded-xl mb-6 group-hover:scale-105 transition-transform duration-300" />
              <h3 className="text-lg font-serif font-medium mb-2 text-hierarchy-primary">{treatment.name}</h3>
              <p className="text-hierarchy-secondary text-sm mb-4 line-clamp-2">{treatment.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-brand-sage">{treatment.price}</span>
                <Link to={`/treatments/${treatment.id}`}>
                  <Button variant="outline" size="sm" className="text-xs px-3 py-2 border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default {
  FeaturedSection,
  BannerSection,
  ProductGrid
};