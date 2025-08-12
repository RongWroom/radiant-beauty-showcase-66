
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  articleAuthor?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  location?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "STW Aesthetic Clinic - Professional Beauty Treatments",
  description = "Professional aesthetic treatments including Cryolipolysis fat freezing, Ultra 4D HIFU, HydraFacial, and laser hair removal. Expert technicians, premium results.",
  keywords = "aesthetic treatments, cryolipolysis, HIFU, hydrafacial, laser hair removal, fibroblast skin tightening, professional beauty clinic",
  image = "https://www.stwaestheticclinic.co.uk/images/hero-blossom.jpg",
  url = "https://www.stwaestheticclinic.co.uk",
  type = "website",
  articleAuthor,
  articlePublishedTime,
  articleModifiedTime,
  location = "Stanley, County Durham, UK"
}) => {
  const fullTitle = title.includes('STW Aesthetic Clinic') ? title : `${title} | STW Aesthetic Clinic`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content="en-GB" />
      <meta name="geo.region" content="GB-DUR" />
      <meta name="geo.placename" content={location} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="STW Aesthetic Clinic" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="STW Aesthetic Clinic - Professional Beauty Treatments" />
      
      {/* Article-specific Open Graph */}
      {articleAuthor && <meta property="article:author" content={articleAuthor} />}
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="STW Aesthetic Clinic - Professional Beauty Treatments" />
      <meta name="twitter:site" content="@stwaestheticclinic" />
      <meta name="twitter:creator" content="@stwaestheticclinic" />
      
      {/* Additional meta tags for better indexing */}
      <meta name="author" content="STW Aesthetic Clinic" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Hreflang for international SEO */}
      <link rel="alternate" hrefLang="en-gb" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
};

export default SEO;
