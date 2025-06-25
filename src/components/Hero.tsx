
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-r from-rose-400/15 to-pink-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Premium overlay pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Main content container */}
      <div className="container-custom relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
        
        {/* Left content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          
          {/* Premium badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-yellow-400/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3 mb-8">
            <Award className="h-5 w-5 text-amber-400" />
            <span className="text-amber-300 font-medium text-sm uppercase tracking-wide">Award-Winning Aesthetic Clinic</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            Transform Your
            <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Natural Beauty
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-light">
            Experience world-class aesthetic treatments with cutting-edge technology and personalized care at 
            <span className="text-amber-300 font-medium"> STW Aesthetics</span>
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
            <div className="flex items-center space-x-2 text-gray-300">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-medium">Premium Treatments</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-medium">Expert Technicians</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/treatments" className="group">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-1 border-0 min-w-[200px]"
              >
                Book Treatment
                <Sparkles className="ml-2 h-5 w-5 group-hover:animate-spin" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-amber-400/50 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400 font-semibold text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all duration-300 min-w-[200px]"
              >
                Free Consultation
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 text-gray-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5.0</div>
                <div className="text-sm">Google Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right content - Logo/Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10 flex justify-center">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-300/20 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Main logo container */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
              <img 
                alt="STW Aesthetic Clinic - Premium Beauty Treatments" 
                src="/lovable-uploads/247e14b1-74cd-4e99-9bea-37c3775cb36d.png" 
                className="h-[300px] sm:h-[400px] lg:h-[500px] w-auto object-contain drop-shadow-2xl" 
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-rose-400 to-pink-300 rounded-full animate-bounce delay-700"></div>
            </div>
          </div>
          
          {/* Ambient lighting effects */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-yellow-400/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
