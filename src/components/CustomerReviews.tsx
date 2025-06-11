
import React from 'react';
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
    text: 'You won\'t regret going to Sharon for any treatment. She\'s friendly, professional and cares about each individual and how the course of treatment is going, and is willing to tailor to your specific needs.',
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
    text: 'I\'ve been going to STW Aesthetic Clinic for my Hydrofacials and my skin has never been better. I no longer have breakouts or dry patches. Sharon is so lovely and really professional.',
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

const CustomerReviews = () => {
  return (
    <section className="bg-section-subtle section">
      <div className="container-custom">
        <div className="text-center mb-24">
          <h2 className="text-5xl lg:text-6xl font-serif mb-8 text-hierarchy-primary">What Our Clients Say</h2>
          <p className="text-hierarchy-secondary max-w-3xl mx-auto text-xl leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience at STW Aesthetic Clinic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 border border-brand-neutral-200"
            >
              <div className="flex mb-6">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-brand-lime text-brand-lime" />
                ))}
              </div>
              <blockquote className="flex-grow">
                <p className="text-hierarchy-secondary italic mb-8 leading-relaxed text-lg">"{review.text}"</p>
              </blockquote>
              <footer className="mt-auto pt-6 border-t border-brand-neutral-200">
                <p className="font-medium text-hierarchy-primary text-lg">{review.name}</p>
              </footer>
            </div>
          ))}
        </div>
        
        <div className="text-center mb-24">
          <Button className="btn-primary text-lg py-4 px-12">
            View All Reviews
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="bg-white px-10 py-8 rounded-2xl shadow-sm flex items-center max-w-md hover:shadow-md transition-shadow duration-300 border border-brand-neutral-200">
            <img 
              src="/placeholder.svg"
              alt="Google Reviews" 
              className="w-12 h-12 mr-6" 
            />
            <div>
              <p className="font-medium text-xl text-hierarchy-primary">4.9 on Google Reviews</p>
              <p className="text-hierarchy-secondary text-lg">Based on 50+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
