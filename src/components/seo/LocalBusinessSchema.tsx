import React from 'react';
import { Review } from '@/data/reviews';

interface LocalBusinessSchemaProps {
  reviews?: Review[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({ 
  reviews = [], 
  aggregateRating = { ratingValue: 5.0, reviewCount: 14 }
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.stwaestheticclinic.co.uk#business',
    name: 'STW Aesthetic Clinic',
    description: 'Professional aesthetic clinic offering Cryolipolysis fat freezing, Ultra 4D HIFU, HydraFacial, laser hair removal, and fibroblast skin tightening treatments in Stanley, County Durham.',
    url: 'https://www.stwaestheticclinic.co.uk',
    logo: 'https://www.stwaestheticclinic.co.uk/images/hero-blossom.jpg',
    image: [
      'https://www.stwaestheticclinic.co.uk/images/hero-blossom.jpg'
    ],
    telephone: '+44 1207 239983',
    email: 'sharon@stwaestheticclinic.co.uk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '110 Front Street',
      addressLocality: 'Stanley',
      addressRegion: 'County Durham',
      postalCode: 'DH9 0AA',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 54.8693,
      longitude: -1.6951
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
        opens: '10:00',
        closes: '18:00'
      }
    ],
    priceRange: '£££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    areaServed: [
      {
        '@type': 'Place',
        name: 'Stanley'
      },
      {
        '@type': 'Place', 
        name: 'County Durham'
      },
      {
        '@type': 'Place',
        name: 'Newcastle upon Tyne'
      },
      {
        '@type': 'Place',
        name: 'Gateshead'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Aesthetic Treatments',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cryolipolysis Fat Freezing',
            description: 'Non-invasive fat reduction treatment using controlled cooling technology'
          }
        },
        {
          '@type': 'Offer', 
          itemOffered: {
            '@type': 'Service',
            name: 'Ultra 4D HIFU',
            description: 'High-intensity focused ultrasound for skin tightening and lifting'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service', 
            name: 'HydraFacial',
            description: 'Deep cleansing and hydrating facial treatment'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Laser Hair Removal', 
            description: 'Professional laser hair removal treatments'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fibroblast Skin Tightening',
            description: 'Non-surgical skin tightening treatment'
          }
        }
      ]
    },
    aggregateRating: aggregateRating.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1
    } : undefined,
    review: reviews.length > 0 ? reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished
    })) : undefined,
    sameAs: [
      'https://www.facebook.com/stwaestheticclinic',
      'https://www.instagram.com/stwaestheticclinic'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;