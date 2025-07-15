
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "STW Aesthetic Clinic - Professional Beauty Treatments",
  description = "Professional aesthetic treatments including Cryolipolysis fat freezing, Ultra 4D HIFU, HydraFacial, and laser hair removal. Expert technicians, premium results.",
  keywords = "aesthetic treatments, cryolipolysis, HIFU, hydrafacial, laser hair removal, fibroblast skin tightening, professional beauty clinic",
  image = "https://www.stwaestheticclinic.co.uk/images/hero-blossom.jpg",
  url = "https://www.stwaestheticclinic.co.uk",
  type = "website"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="STW Aesthetic Clinic" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@stwaestheticclinic" />
      <meta name="twitter:creator" content="@stwaestheticclinic" />
      
      {/* Additional Twitter tags for better sharing */}
      <meta name="twitter:image:alt" content="STW Aesthetic Clinic - Professional Beauty Treatments" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
