import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock } from 'lucide-react';

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-[90vh] flex items-center">
    {/* Background blobs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -left-24 -top-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -right-20 top-1/4 w-64 h-64 bg-pink-50 rounded-full blur-2xl opacity-40"></div>
      <div className="absolute left-1/3 bottom-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
    </div>

    <div className="container mx-auto px-6 lg:px-0 flex flex-col-reverse lg:flex-row items-center relative z-10">
      {/* Left / Text */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
        {/* 5-star Badge */}
        <div className="inline-flex items-center bg-white/80 backdrop-blur-md px-5 py-2 rounded-full shadow-md animate-fade-in-up">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-indigo-500" />
          ))}
          <span className="ml-3 font-semibold text-indigo-600">5.0</span>
          <span className="ml-2 text-gray-600">• 500+ Transformations</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-gray-800">
          Elevate Your<br/>
          <span className="relative inline-block">
            <span className="text-indigo-600">Natural Beauty</span>
            <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-indigo-400 via-pink-300 to-indigo-400 rounded-full"></span>
          </span>
        </h1>
        <p className="max-w-xl text-lg md:text-xl text-gray-600 font-light">
          Experience <span className="font-medium text-gray-800">bespoke aesthetic artistry</span>, delivered by award-winning experts.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
          {[
            { num: '500+', label: 'Happy Clients' },
            { num: '15+',  label: 'Years Experience' },
            { num: '98%', label: 'Satisfaction Rate' },
          ].map(({num,label}, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl font-serif font-bold text-indigo-600">{num}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/treatments" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-pink-500 hover:to-indigo-600 text-white py-4 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition">
              Start Your Transformation <Clock className="inline-block ml-2" />
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-4 px-8 rounded-xl backdrop-blur-sm transition">
              Free Consultation
            </Button>
          </Link>
        </div>

        {/* Trust icons */}
        <div className="flex flex-wrap gap-6 mt-6 justify-center lg:justify-start text-gray-600">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>Certified Practitioners</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Personalised Care</span>
          </div>
        </div>
      </div>

      {/* Right / Visual */}
      <div className="w-full lg:w-1/2 mb-12 lg:mb-0 px-6 lg:px-0">
        <div className="relative max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200 overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-transparent opacity-30"></div>
            <div className="relative space-y-6">
              <div className="text-center">
                <img src="/lovable-uploads/logo.png" alt="STW Logo" className="mx-auto h-28 mb-4"/>
                <h3 className="text-2xl font-serif text-gray-800">Premium Aesthetics</h3>
                <p className="text-gray-500">Cutting-Edge • Bespoke • Results-Driven</p>
              </div>
              {/* Features */}
              {[
                { icon: <Star className="w-6 h-6 text-white" />, title: 'HydraFacial MD', subtitle: 'Instant Glow – Zero Downtime', bg: 'from-indigo-500' },
                { icon: <Award className="w-6 h-6 text-white" />, title: 'Ultra HIFU', subtitle: 'Skin Tightening – Non-Invasive', bg: 'from-pink-500' },
                { icon: <Users className="w-6 h-6 text-white" />, title: 'Cryolipolysis', subtitle: 'Body Contouring – FDA Approved', bg: 'from-blue-400' },
              ].map((f,i) => (
                <div key={i} className="flex items-center justify-between bg-white/60 p-4 rounded-2xl">
                  <div>
                    <h4 className="font-medium text-gray-800">{f.title}</h4>
                    <p className="text-sm text-gray-500">{f.subtitle}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.bg} to-indigo-300 flex items-center justify-center`}>
                    {f.icon}
                  </div>
                </div>
              ))}
              <Link to="/treatments">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg mt-4 transition">
                  View All Treatments
                </Button>
              </Link>
            </div>
          </div>
          {/* Floating accent */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-200 rounded-full blur-2xl opacity-30"></div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;