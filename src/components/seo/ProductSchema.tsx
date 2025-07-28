import React from 'react';

interface ProductSchemaProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    image_url?: string;
    product_benefits?: string[];
  };
}

const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://www.stwaestheticclinic.co.uk/products/${product.id}#product`,
    name: product.name,
    description: product.description,
    image: product.image_url ? [product.image_url] : undefined,
    brand: {
      '@type': 'Brand',
      name: 'STW Aesthetic Clinic'
    },
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'STW Aesthetic Clinic',
        url: 'https://www.stwaestheticclinic.co.uk'
      },
      validFrom: new Date().toISOString().split('T')[0]
    },
    category: 'Beauty & Personal Care',
    additionalProperty: product.product_benefits?.map(benefit => ({
      '@type': 'PropertyValue',
      name: 'Benefit',
      value: benefit
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '23',
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

export default ProductSchema;