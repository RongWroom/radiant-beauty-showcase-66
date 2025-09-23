
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock } from 'lucide-react';

const Hero = () => (
  <section className="relative min-h-screen tablet:min-h-[75vh] flex items-center tablet:items-start">
    {/* Optimized LCP image with proper attributes */}
    <img 
      src="https://images.pexels.com/photos/4022219/pexels-photo-4022219.jpeg?auto=compress&cs=tinysrgb&w=1200"
      alt="Professional aesthetic clinic treatment room with modern equipment"
      className="absolute inset-0 w-full h-full object-cover"
      fetchPriority="high"
      width="1200"
      height="800"
      decoding="async"
    />
    {/* Overlay for contrast */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-off-white/80 to-brand-light-gray/60" />

    {/* Decorative blobs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-brand-slate-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute right-20 top-1/4 w-64 h-64 bg-brand-silver/10 rounded-full blur-2xl"></div>
      <div className="absolute left-1/3 bottom-16 w-80 h-80 bg-brand-slate-blue-light/20 rounded-full blur-3xl"></div>
    </div>

    {/* Content */}
    <div className="w-full max-w-7xl relative z-10 mx-auto flex flex-col-reverse tablet:flex-row items-center tablet:items-start gap-x-8 tablet:gap-x-12 px-4 sm:px-6 tablet:px-8 lg:px-8 py-8 sm:py-12 tablet:py-14 lg:py-16">
      {/* Left Column (center-aligned on mobile, left-aligned on tablet+) */}
      <div className="w-full tablet:w-1/2 space-y-4 tablet:space-y-6 flex flex-col items-center tablet:items-start">
        {/* Reviews badge */}
        <div className="inline-flex items-center bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-brand-slate-blue text-brand-slate-blue" />
          ))}
          <span className="ml-3 font-semibold text-brand-slate-blue">5.0</span>
          <span className="ml-2 text-brand-gray-600">• 15+ Years Experience</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl tablet:text-5xl lg:text-6xl text-brand-charcoal leading-tight text-center tablet:text-left">
          Polish Your<br />
          <span className="relative inline-block">
            <span className="text-brand-slate-blue font-semibold">Natural Beauty</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-brand-slate-blue via-brand-silver to-brand-slate-blue-light rounded-full"></span>
          </span>
        </h1>

        {/* Subhead */}
        <p className="max-w-xl text-base tablet:text-lg text-brand-gray-600 text-center tablet:text-left">
          We specialise in creating timeless radiance. <br className="hidden tablet:block" /> Where advanced science meets bespoke care.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 tablet:gap-4 max-w-xs tablet:max-w-md">
          {[['5', 'Treatments'], ['10+', 'Reviews'], ['100%', 'Satisfaction']].map(([num, label]) => (
            <div key={label} className="space-y-1 text-center">
              <div className="text-2xl tablet:text-3xl font-serif font-bold text-brand-slate-blue">{num}</div>
              <div className="text-xs tablet:text-sm font-medium text-brand-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 tablet:gap-4 w-full sm:w-auto justify-center tablet:justify-start">
          <Link to="/treatments" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light text-white py-3 tablet:py-4 px-6 tablet:px-8 text-sm tablet:text-base rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition">
              Start Your Transformation <Clock className="inline-block ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white py-3 tablet:py-4 px-6 tablet:px-8 text-sm tablet:text-base rounded-xl backdrop-blur-sm transition">
              Free Consultation
            </Button>
          </Link>
        </div>

        {/* Trust Icons */}
        <div className="flex flex-wrap gap-4 tablet:gap-6 mt-4 tablet:mt-6 text-brand-gray-600 text-sm tablet:text-base justify-center tablet:justify-start">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 tablet:w-5 tablet:h-5 text-brand-slate-blue" />
            <span>Certified Practitioner</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 tablet:w-5 tablet:h-5 text-brand-slate-blue" />
            <span>Personalised Care</span>
          </div>
        </div>
      </div>

      {/* Right Column: pixel accents only */}
      <div className="w-full tablet:w-1/2 relative tablet:min-h-[400px]">
        {/* No image element here—background covers full area */}
      </div>
    </div>
  </section>
);

export default Hero;
