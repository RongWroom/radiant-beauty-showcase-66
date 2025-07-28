import React from 'react';

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  businessName?: string;
}

const ReviewSchema: React.FC<ReviewSchemaProps> = ({ 
  reviews, 
  businessName = 'STW Aesthetic Clinic' 
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessName,
    review: reviews.map(review => ({
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
      datePublished: review.datePublished
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
      reviewCount: reviews.length.toString(),
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

export default ReviewSchema;