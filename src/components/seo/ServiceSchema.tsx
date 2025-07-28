import React from 'react';

interface ServiceSchemaProps {
  service: {
    id: string | number;
    name: string;
    description: string;
    price?: number;
    duration?: string;
    category?: string;
  };
}

const ServiceSchema: React.FC<ServiceSchemaProps> = ({ service }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `https://www.stwaestheticclinic.co.uk/treatments/${service.id}#service`,
    name: service.name,
    description: service.description,
    procedureType: service.category || 'Aesthetic Treatment',
    bodyLocation: getBodyLocation(service.name),
    preparation: 'Consultation required before treatment. Avoid sun exposure and certain medications.',
    followup: 'Follow-up appointment may be recommended. Post-treatment care instructions provided.',
    howPerformed: 'Performed by qualified aesthetic practitioners using professional equipment.',
    provider: {
      '@type': 'MedicalBusiness',
      name: 'STW Aesthetic Clinic',
      url: 'https://www.stwaestheticclinic.co.uk',
      telephone: '+44-1234-567890'
    },
    offers: service.price ? {
      '@type': 'Offer',
      price: service.price.toString(),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock'
    } : undefined,
    estimatedCost: service.price ? {
      '@type': 'MonetaryAmount',
      currency: 'GBP',
      value: service.price
    } : undefined,
    duration: service.duration ? `PT${service.duration}` : undefined,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '89',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const getBodyLocation = (serviceName: string): string => {
  const name = serviceName.toLowerCase();
  if (name.includes('face') || name.includes('facial')) return 'Face';
  if (name.includes('body') || name.includes('fat')) return 'Body';
  if (name.includes('hair')) return 'Body';
  if (name.includes('skin')) return 'Skin';
  return 'Body';
};

export default ServiceSchema;