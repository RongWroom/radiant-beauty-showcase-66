
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
    <section className="bg-skin-lightgreen py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience at STW Aesthetic Clinic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="flex mb-3">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-skin-teal text-skin-teal" />
                ))}
              </div>
              <blockquote className="flex-grow">
                <p className="text-gray-600 italic mb-4">"{review.text}"</p>
              </blockquote>
              <footer className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-medium">{review.name}</p>
              </footer>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-skin-teal text-white hover:bg-skin-teal/90">
            View All Reviews
          </Button>
        </div>

        <div className="flex justify-center mt-16">
          <div className="bg-white px-6 py-4 rounded-lg shadow-sm flex items-center max-w-md">
            <img 
              src="/placeholder.svg"
              alt="Google Reviews" 
              className="w-10 h-10 mr-3" 
            />
            <div>
              <p className="font-medium">4.9 on Google Reviews</p>
              <p className="text-sm text-gray-600">Based on 50+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
