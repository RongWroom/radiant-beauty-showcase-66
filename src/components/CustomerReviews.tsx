
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
    <section className="bg-section-subtle section pb-12">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-6 text-hierarchy-primary">What Our Clients Say</h2>
          <p className="text-hierarchy-secondary max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {visibleReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-6 md:p-7 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 border border-brand-warm-gray-200 animate-fade-in"
            >
              <div className="flex mb-5">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-brand-rose-gold text-brand-rose-gold" />
                ))}
              </div>
              <blockquote className="flex-grow">
                <p className="text-hierarchy-secondary italic mb-7 leading-relaxed text-base md:text-lg">"{review.text}"</p>
              </blockquote>
              <footer className="mt-auto pt-5 border-t border-brand-warm-gray-200">
                <p className="font-medium text-hierarchy-primary text-base md:text-lg">{review.name}</p>
              </footer>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          {reviews.length > defaultCount && (
            <Button
              className="btn-primary text-base py-3 px-8"
              variant="default"
              onClick={() => setShowAll((s) => !s)}
              aria-expanded={showAll}
            >
              {showAll ? 'Show Fewer Reviews' : 'Show More Reviews'}
            </Button>
          )}
        </div>

        <div className="flex justify-center">
          <div className="bg-white px-8 py-7 rounded-xl shadow-sm flex items-center max-w-md hover:shadow-md transition-shadow duration-300 border border-brand-warm-gray-200">
            <img 
              src="/placeholder.svg"
              alt="Google Reviews" 
              className="w-12 h-12 mr-5" 
            />
            <div>
              <p className="font-medium text-lg md:text-xl text-hierarchy-primary">4.9 on Google Reviews</p>
              <p className="text-hierarchy-secondary text-base md:text-lg">Based on 50+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;

