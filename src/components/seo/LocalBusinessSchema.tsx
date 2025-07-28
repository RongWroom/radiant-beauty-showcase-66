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
    '@type': 'HealthAndBeautyBusiness',
    '@id': 'https://www.stwaestheticclinic.co.uk#business',
    name: 'STW Aesthetic Clinic',
    description: 'Professional aesthetic clinic offering Cryolipolysis fat freezing, Ultra 4D HIFU, HydraFacial, laser hair removal, and fibroblast skin tightening treatments.',
    url: 'https://www.stwaestheticclinic.co.uk',
    telephone: '+44-01207 239983',
    email: 'info@stwaestheticclinic.co.uk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Treatment Rooms',
      addressLocality: 'Stanley',
      addressRegion: 'Co Durham',
      postalCode: 'DH9 0TY',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '54.868699029740135',
      longitude: '-1.7004918732064431'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/stwaestheticclinic',
      'https://www.instagram.com/stwaestheticclinic',
      'https://www.linkedin.com/company/stwaestheticclinic'
    ],
    serviceType: [
      'Aesthetic Treatments',
      'Beauty Therapy',
      'Non-surgical Cosmetic Procedures',
      'Skin Care Services'
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '54.868699029740135',
        longitude: '-1.7004918732064431'
      },
      geoRadius: '50000'
    },
    priceRange: '££',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'],
    currenciesAccepted: 'GBP',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue.toString(),
      reviewCount: aggregateRating.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    ...(reviews.length > 0 && {
      review: reviews.slice(0, 5).map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating.toString(),
          bestRating: '5',
          worstRating: '1'
        },
        reviewBody: review.reviewBody,
        ...(review.datePublished && { datePublished: review.datePublished })
      }))
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;