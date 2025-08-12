import React from 'react';

const WebsiteSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.stwaestheticclinic.co.uk#website',
    name: 'STW Aesthetic Clinic',
    url: 'https://www.stwaestheticclinic.co.uk',
    description: 'Professional aesthetic treatments including Cryolipolysis fat freezing, Ultra 4D HIFU, HydraFacial, and laser hair removal. Expert technicians, premium results.',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.stwaestheticclinic.co.uk#organization'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.stwaestheticclinic.co.uk/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en-GB'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default WebsiteSchema;