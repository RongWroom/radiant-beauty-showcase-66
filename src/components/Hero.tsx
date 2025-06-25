import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock } from 'lucide-react';
const Hero = () => <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Full-bleed background */}
    <div className="absolute inset-0 bg-cover bg-center" style={{
    backgroundImage: "url('https://images.pexels.com/photos/4022219/pexels-photo-4022219.jpeg?auto=compress&cs=tinysrgb&w=1200')"
  }} />
    {/* Overlay for contrast */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-off-white/80 to-brand-light-gray/60" />

    {/* Decorative blobs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-brand-slate-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute right-20 top-1/4 w-64 h-64 bg-brand-silver/10 rounded-full blur-2xl"></div>
      <div className="absolute left-1/3 bottom-16 w-80 h-80 bg-brand-slate-blue-light/20 rounded-full blur-3xl"></div>
    </div>

    {/* Content */}
    <div className="w-full max-w-7xl relative z-10 mx-auto flex flex-col-reverse lg:flex-row items-start gap-x-12 px-4 sm:px-6 lg:px-8 py-0">
      {/* Left Column (always left-aligned) */}
      <div className="w-full lg:w-1/2 space-y-6 flex flex-col items-start">
        {/* Reviews badge */}
        <div className="inline-flex items-center bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-slate-blue text-brand-slate-blue" />)}
          <span className="ml-3 font-semibold text-brand-slate-blue">5.0</span>
          <span className="ml-2 text-brand-gray-600">• 500+ Transformations</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal leading-tight text-left">
          Polish Your<br />
          <span className="relative inline-block">
            <span className="text-brand-slate-blue font-semibold">Natural Beauty</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-brand-slate-blue via-brand-silver to-brand-slate-blue-light rounded-full"></span>
          </span>
        </h1>

        {/* Subhead */}
        <p className="max-w-xl text-lg text-brand-gray-600 text-left">
          We specialise in creating timeless radiance. <br /> Where advanced science meets bespoke care.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md">
          {[['5', 'Treatments'], ['10+', 'Reviews'], ['100%', 'Satisfaction']].map(([num, label]) => <div key={label} className="space-y-1 text-left">
              <div className="text-3xl font-serif font-bold text-brand-slate-blue">{num}</div>
              <div className="text-sm font-medium text-brand-gray-600">{label}</div>
            </div>)}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/treatments" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light text-white py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition">
              Start Your Transformation <Clock className="inline-block ml-2" />
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white py-4 px-8 rounded-xl backdrop-blur-sm transition">
              Free Consultation
            </Button>
          </Link>
        </div>

        {/* Trust Icons */}
        <div className="flex flex-wrap gap-6 mt-6 text-brand-gray-600">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-brand-slate-blue" />
            <span>Certified Practitioners</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-brand-slate-blue" />
            <span>Personalised Care</span>
          </div>
        </div>
      </div>

      {/* Right Column: pixel accents only */}
      <div className="w-full lg:w-1/2 relative">
        <div className="absolute top-12 left-12 w-16 h-16 bg-brand-silver/20" style={{
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
      }} />
        
        {/* No image element here—background covers full area */}
      </div>
    </div>
  </section>;
export default Hero;