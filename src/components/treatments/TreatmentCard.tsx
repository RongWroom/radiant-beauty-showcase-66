
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star } from 'lucide-react';
import { Treatment } from '@/hooks/useTreatments';

interface TreatmentCardProps {
  treatment: Treatment;
  isFeatured?: boolean;
}

const TreatmentCard = ({ treatment, isFeatured = false }: TreatmentCardProps) => {
  const formatPrice = (price: number, currency: string | null) => {
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(0)}`;
  };

  if (isFeatured) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full border-brand-silver/30">
        <div className="relative">
          {/* 16:9 aspect ratio for featured card */}
          <AspectRatio ratio={16 / 9}>
            <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="w-full h-full object-cover" />
          </AspectRatio>
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <Badge className="font-medium px-2 sm:px-3 py-1 bg-brand-silver text-brand-charcoal text-xs sm:text-sm">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Most Popular
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-slate-blue/90 to-transparent p-4 md:p-6 text-white">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-medium text-white mb-2">{treatment.name}</h3>
            <p className="text-sm md:text-base mt-1 mb-4 line-clamp-2 text-white/90">
              {treatment.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="font-medium text-white text-base md:text-lg">{formatPrice(treatment.price, treatment.currency)}</span>
              <Link to={`/treatments/${treatment.id}`}>
                <Button size="sm" className="bg-white text-brand-slate-blue hover:bg-brand-off-white text-sm md:text-base py-2 px-4 md:px-6 h-auto">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full border-brand-silver/30 flex flex-col">
      <div className="relative">
        {/* 16:9 aspect ratio for regular cards */}
        <AspectRatio ratio={16 / 9}>
          <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="w-full h-full object-cover" />
        </AspectRatio>
      </div>
      <CardContent className="p-4 md:p-6 bg-white/90 flex-1 flex flex-col">
        <h3 className="font-serif text-base sm:text-lg md:text-xl font-medium text-brand-charcoal mb-2">{treatment.name}</h3>
        <p className="text-sm md:text-base text-brand-gray-600 line-clamp-2 mt-1 mb-4 flex-1">
          {treatment.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg md:text-xl font-medium text-brand-slate-blue">{formatPrice(treatment.price, treatment.currency)}</span>
          <Link to={`/treatments/${treatment.id}`}>
            <Button size="sm" className="text-sm md:text-base py-2 px-4 md:px-6 h-auto">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentCard;
