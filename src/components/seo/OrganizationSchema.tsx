import React from 'react';

const OrganizationSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.stwaestheticclinic.co.uk#organization',
    name: 'STW Aesthetic Clinic',
    description: 'Professional aesthetic clinic offering advanced non-surgical beauty treatments including Cryolipolysis, Ultra 4D HIFU, HydraFacial, and laser hair removal in Stanley, County Durham.',
    url: 'https://www.stwaestheticclinic.co.uk',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.stwaestheticclinic.co.uk/images/hero-blossom.jpg',
      width: 1200,
      height: 630
    },
    image: 'https://www.stwaestheticclinic.co.uk/images/hero-blossom.jpg',
    email: 'sharon@stwaestheticclinic.co.uk',
    telephone: '+44 1207 239983',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '110 Front Street',
      addressLocality: 'Stanley',
      addressRegion: 'County Durham',
      postalCode: 'DH9 0AA',
      addressCountry: 'GB'
    },
    foundingDate: '2009',
    numberOfEmployees: '2-10',
    slogan: 'Polish Your Natural Beauty',
    areaServed: [
      {
        '@type': 'Place',
        name: 'Stanley, County Durham'
      },
      {
        '@type': 'Place',
        name: 'Newcastle upon Tyne'
      },
      {
        '@type': 'Place',
        name: 'Gateshead'
      },
      {
        '@type': 'Place',
        name: 'Durham'
      }
    ],
    knowsAbout: [
      'Aesthetic treatments',
      'Cryolipolysis',
      'HIFU treatments',
      'HydraFacial',
      'Laser hair removal',
      'Fibroblast skin tightening',
      'Non-surgical beauty treatments',
      'Professional skincare'
    ],
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

export default OrganizationSchema;