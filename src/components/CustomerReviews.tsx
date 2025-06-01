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
    <section className="bg-gradient-to-br from-skin-lightgreen/40 to-white py-32">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-serif mb-6 text-gray-800">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience at STW Aesthetic Clinic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group hover:-translate-y-1"
            >
              <div className="flex mb-4">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-skin-orange text-skin-orange" />
                ))}
              </div>
              <blockquote className="flex-grow">
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.text}"</p>
              </blockquote>
              <footer className="mt-auto pt-6 border-t border-gray-100">
                <p className="font-medium text-gray-800">{review.name}</p>
              </footer>
            </div>
          ))}
        </div>
        
        <div className="text-center mb-20">
          <Button className="bg-gradient-primary text-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 px-10 py-4 text-lg font-medium">
            View All Reviews
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-sm flex items-center max-w-md hover:shadow-md transition-shadow duration-300">
            <img 
              src="/placeholder.svg"
              alt="Google Reviews" 
              className="w-12 h-12 mr-4" 
            />
            <div>
              <p className="font-medium text-lg text-gray-800">4.9 on Google Reviews</p>
              <p className="text-gray-600">Based on 50+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
