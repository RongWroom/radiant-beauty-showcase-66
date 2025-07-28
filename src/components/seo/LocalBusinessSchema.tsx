import React from 'react';

const LocalBusinessSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://www.stwaestheticclinic.co.uk#business',
    name: 'STW Aesthetic Clinic',
    description: 'Professional aesthetic clinic offering Cryolipolysis fat freezing, Ultra 4D HIFU, HydraFacial, laser hair removal, and fibroblast skin tightening treatments.',
    url: 'https://www.stwaestheticclinic.co.uk',
    telephone: '+44-1234-567890',
    email: 'info@stwaestheticclinic.co.uk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Beauty Street',
      addressLocality: 'London',
      addressRegion: 'London',
      postalCode: 'SW1A 1AA',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '51.5074',
      longitude: '-0.1278'
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
    medicalSpecialty: [
      'Aesthetic Medicine',
      'Cosmetic Dermatology',
      'Non-surgical Treatments'
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '51.5074',
        longitude: '-0.1278'
      },
      geoRadius: '50000'
    },
    priceRange: '££',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'],
    currenciesAccepted: 'GBP',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Amazing results with the HIFU treatment. Professional staff and clean facilities.',
        datePublished: '2024-12-15'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Michael Brown'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Excellent cryolipolysis treatment. Saw results within weeks!',
        datePublished: '2024-11-28'
      }
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