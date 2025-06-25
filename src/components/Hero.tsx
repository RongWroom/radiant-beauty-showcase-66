
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-white to-brand-light-gray/30 min-h-screen">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-slate-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-brand-silver/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-brand-slate-blue/3 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/lovable-uploads/72ed3b10-bdb8-421e-95eb-1645b48a2b97.png" 
          alt="" 
          className="w-full h-full object-cover mix-blend-soft-light" 
        />
      </div>
      
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-white/30"></div>
      
      <div className="container-custom min-h-screen flex flex-col xl:flex-row items-center relative z-10 py-12 xl:py-0">
        {/* Left Content - Premium messaging */}
        <div className="w-full xl:w-1/2 z-10 text-center xl:text-left px-4 md:px-6 xl:px-0 py-8 xl:py-0">
          {/* Social proof banner */}
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-4 md:px-6 py-3 rounded-full shadow-lg border border-brand-silver/20 mb-6 md:mb-8 animate-fade-in">
            <div className="flex items-center space-x-2 text-sm font-medium text-brand-charcoal">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-slate-blue text-brand-slate-blue" />
                ))}
              </div>
              <span className="text-brand-slate-blue font-semibold">5.0</span>
              <span className="text-brand-gray-600 hidden sm:inline">• 500+ Transformations</span>
              <span className="text-brand-gray-600 sm:hidden">• 500+</span>
            </div>
          </div>
          
          {/* Main headline - psychological impact */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-brand-charcoal leading-tight mb-4 md:mb-6 font-medium">
              Transform Your
              <br />
              <span className="relative">
                <span className="text-brand-slate-blue font-semibold">Natural Beauty</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-brand-slate-blue via-brand-silver to-brand-slate-blue-light rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-brand-gray-600 max-w-2xl mx-auto xl:mx-0 mb-6 md:mb-8 leading-relaxed font-light">
              Experience the art of{" "}
              <span className="font-medium text-brand-charcoal bg-gradient-to-r from-brand-silver/30 to-brand-slate-blue/10 px-2 md:px-3 py-1 rounded-md">
                advanced aesthetic excellence
              </span>{" "}
              with treatments that deliver visible, lasting results.
            </p>
          </div>
          
          {/* Credibility indicators */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10 max-w-lg mx-auto xl:mx-0">
            <div className="text-center xl:text-left">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-slate-blue mb-1">500+</div>
              <div className="text-xs sm:text-sm text-brand-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center xl:text-left">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-slate-blue mb-1">15+</div>
              <div className="text-xs sm:text-sm text-brand-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center xl:text-left">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-slate-blue mb-1">98%</div>
              <div className="text-xs sm:text-sm text-brand-gray-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
          
          {/* Premium CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center xl:justify-start max-w-md mx-auto lg:max-w-none xl:mx-0 mb-6 md:mb-8">
            <Link to="/treatments" className="flex-1 sm:flex-none">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white text-base md:text-lg font-semibold py-5 md:py-6 px-8 md:px-10 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Your Transformation</span>
                  <Clock className="h-4 md:h-5 w-4 md:w-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to="/contact" className="flex-1 sm:flex-none">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-gradient-to-r hover:from-brand-slate-blue hover:to-brand-slate-blue-light hover:text-white text-base md:text-lg font-semibold py-5 md:py-6 px-8 md:px-10 transition-all duration-300 rounded-xl bg-white/90 backdrop-blur-sm"
              >
                Free Consultation
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 md:gap-6 text-sm text-brand-gray-600">
            <div className="flex items-center space-x-2">
              <Award className="h-4 md:h-5 w-4 md:w-5 text-brand-slate-blue" />
              <span>Certified Practitioners</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 md:h-5 w-4 md:w-5 text-brand-slate-blue" />
              <span>Personalised Care</span>
            </div>
          </div>
        </div>
        
        {/* Right Content - Visual element */}
        <div className="w-full xl:w-1/2 mt-8 md:mt-12 xl:mt-0 relative">
          {/* Premium card layout inspired by reference */}
          <div className="relative max-w-md md:max-w-lg mx-auto">
            {/* Main treatment card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-brand-silver/20 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-slate-blue/5 to-transparent"></div>
              
              <div className="relative z-10">
                {/* Logo/Brand area */}
                <div className="text-center mb-6 md:mb-8">
                  <img 
                    alt="STW Aesthetic Clinic professional treatments" 
                    src="/lovable-uploads/247e14b1-74cd-4e99-9bea-37c3775cb36d.png" 
                    className="mx-auto h-24 md:h-32 w-auto object-contain mb-3 md:mb-4" 
                  />
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-brand-charcoal">Premium Aesthetics</h3>
                  <p className="text-brand-gray-600 text-sm">Advanced Technology • Expert Care</p>
                </div>
                
                {/* Feature highlights */}
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between p-3 md:p-4 bg-brand-off-white/80 rounded-xl md:rounded-2xl">
                    <div>
                      <div className="font-semibold text-brand-charcoal text-sm md:text-base">HydraFacial MD</div>
                      <div className="text-xs md:text-sm text-brand-gray-600">Instant Glow • Zero Downtime</div>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light rounded-lg md:rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 md:h-6 md:w-6 text-white fill-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 md:p-4 bg-brand-off-white/80 rounded-xl md:rounded-2xl">
                    <div>
                      <div className="font-semibold text-brand-charcoal text-sm md:text-base">Ultra 4D HIFU</div>
                      <div className="text-xs md:text-sm text-brand-gray-600">Skin Tightening • Non-Invasive</div>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-silver to-brand-slate-blue-light rounded-lg md:rounded-xl flex items-center justify-center">
                      <Award className="h-5 w-5 md:h-6 md:w-6 text-brand-charcoal" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 md:p-4 bg-brand-off-white/80 rounded-xl md:rounded-2xl">
                    <div>
                      <div className="font-semibold text-brand-charcoal text-sm md:text-base">Cryolipolysis</div>
                      <div className="text-xs md:text-sm text-brand-gray-600">Body Contouring • FDA Approved</div>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-slate-blue to-brand-silver rounded-lg md:rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Bottom CTA */}
                <div className="mt-5 md:mt-6 text-center">
                  <Link to="/treatments">
                    <Button className="w-full bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base">
                      View All Treatments
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Floating elements for premium feel */}
            <div className="absolute -top-3 md:-top-4 -right-3 md:-right-4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-brand-silver to-brand-slate-blue-light rounded-full blur-xl opacity-30"></div>
            <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-brand-slate-blue to-brand-silver rounded-full blur-2xl opacity-20"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient for seamless transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-brand-off-white/90 to-transparent"></div>
    </section>
  );
};

export default Hero;
