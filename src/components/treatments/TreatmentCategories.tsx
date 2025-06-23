
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Syringe } from 'lucide-react';

const TreatmentCategories = () => {
  const categories = [
    {
      icon: Droplet,
      title: "Facial Treatments",
      description: "Comprehensive facial care including deep cleansing, hydrating facials, exfoliation treatments, and customised mask applications. Perfect for maintaining healthy, glowing skin and addressing specific skin concerns."
    },
    {
      icon: Syringe,
      title: "Anti-Ageing Solutions", 
      description: "Advanced treatments targeting fine lines, wrinkles, and age spots. Includes collagen-boosting therapies, peptide treatments, and non-invasive procedures designed to restore youthful radiance and firmness."
    },
    {
      icon: Droplet,
      title: "Skin Rejuvenation",
      description: "Revitalising treatments that promote cellular renewal and improve skin texture. Features resurfacing treatments, brightening therapies, and specialised procedures for enhanced skin clarity and tone."
    }
  ];

  return (
    <section className="py-9 bg-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-serif mb-7 text-brand-charcoal font-bold">Treatment Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center text-center bg-brand-slate-blue text-white h-full">
                  <div className="rounded-full bg-brand-silver p-4 mb-4">
                    <IconComponent className="w-8 h-8 text-brand-charcoal" />
                  </div>
                  <h3 className="font-serif text-xl mb-3 text-white">{category.title}</h3>
                  <p className="text-brand-silver leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TreatmentCategories;
