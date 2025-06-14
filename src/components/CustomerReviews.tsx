
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'AC Fletcher',
    stars: 5,
    text: 'Really good service received from Sharon. Great initial consultation, very informative & detailed to ensure I knew what to expect throughout the laser hair removal treatment. Sharon is always professional, friendly & approachable.',
  },
  {
    id: 2,
    name: 'Megan Coulson',
    stars: 5,
    text: "You won't regret going to Sharon for any treatment. She's friendly, professional and cares about each individual and how the course of treatment is going, and is willing to tailor to your specific needs.",
  },
  {
    id: 3,
    name: 'Tracey Thornton-Clark',
    stars: 5,
    text: 'I had the pleasure of experiencing a Hifu facial, Hydrafacial, and laser skin rejuvenation treatment from Sharon, and I must say, the results were absolutely incredible! Sharon is a true magician when it comes to skincare.',
  },
  {
    id: 4,
    name: 'Leanne Wears',
    stars: 5,
    text: "I've been going to STW Aesthetic Clinic for my Hydrofacials and my skin has never been better. I no longer have breakouts or dry patches. Sharon is so lovely and really professional.",
  },
  {
    id: 5,
    name: 'Danielle Cullen',
    stars: 5,
    text: 'Great service. Sharon is so professional and friendly. I love the hydrafacial skin treatment and cool sculpting treatment. Fabulous business. Great prices. Highly recommend.',
  },
  {
    id: 6,
    name: 'Zainab Alfaham',
    stars: 5,
    text: 'Had four sessions so far and have already seen a reduction in hair growth. Sharon is very friendly and professional. Will work to your schedule! Happy customer so far!',
  },
];

const DEFAULT_REVIEWS_DESKTOP = 3;
const DEFAULT_REVIEWS_MOBILE = 1;

const CustomerReviews = () => {
  const [showAll, setShowAll] = useState(false);

  // Responsive: show fewer reviews by default on mobile
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const defaultCount = isMobile ? DEFAULT_REVIEWS_MOBILE : DEFAULT_REVIEWS_DESKTOP;
  const visibleReviews = showAll ? reviews : reviews.slice(0, defaultCount);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-off-white to-brand-white section pb-12">
      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-6 text-brand-charcoal">What Our Clients Say</h2>
          <p className="text-brand-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {visibleReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white/90 backdrop-blur-sm p-6 md:p-7 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 border border-brand-silver/30 animate-fade-in"
            >
              <div className="flex mb-5">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-brand-slate-blue text-brand-slate-blue" />
                ))}
              </div>
              <blockquote className="flex-grow">
                <p className="text-brand-gray-600 italic mb-7 leading-relaxed text-base md:text-lg">"{review.text}"</p>
              </blockquote>
              <footer className="mt-auto pt-5 border-t border-brand-silver/20">
                <p className="font-medium text-brand-charcoal text-base md:text-lg">{review.name}</p>
              </footer>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          {reviews.length > defaultCount && (
            <Button
              className="bg-brand-slate-blue hover:bg-brand-slate-blue-light text-white text-base py-3 px-8 shadow-md hover:shadow-lg transition-all duration-300"
              variant="default"
              onClick={() => setShowAll((s) => !s)}
              aria-expanded={showAll}
            >
              {showAll ? 'Show Fewer Reviews' : 'Show More Reviews'}
            </Button>
          )}
        </div>

        <div className="flex justify-center">
          <div className="bg-white/95 backdrop-blur-sm px-8 py-7 rounded-xl shadow-sm flex items-center max-w-md hover:shadow-md transition-shadow duration-300 border border-brand-silver/30">
            <img 
              src="/placeholder.svg"
              alt="Google Reviews" 
              className="w-12 h-12 mr-5" 
            />
            <div>
              <p className="font-medium text-lg md:text-xl text-brand-charcoal">4.9 on Google Reviews</p>
              <p className="text-brand-gray-600 text-base md:text-lg">Based on 50+ reviews</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced flowing gradient overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-brand-slate-blue/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-brand-silver/15 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-gradient-to-r from-brand-slate-blue/5 to-transparent rounded-full blur-xl"></div>
    </section>
  );
};

export default CustomerReviews;
