import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-full">
          <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <Badge variant="secondary" className="font-medium px-2 sm:px-3 py-1 bg-brand-silver text-brand-charcoal text-xs sm:text-sm">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Most Popular
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-slate-blue/90 to-transparent p-3 sm:p-4 text-white">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-1">{treatment.name}</h3>
            <p className="text-xs sm:text-sm mt-1 mb-2 line-clamp-2">
              {treatment.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-medium text-brand-light-gray text-sm sm:text-base">{formatPrice(treatment.price, treatment.currency)}</span>
              <Link to={`/treatments/${treatment.id}`}>
                <Button size="sm" variant="secondary" className="bg-brand-silver text-brand-charcoal hover:bg-brand-silver-light text-xs sm:text-sm min-h-[36px] px-3 sm:px-4">
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="relative h-40 sm:h-48">
        <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-3 sm:p-4 flex flex-col h-full">
        <h3 className="font-serif text-base sm:text-lg font-medium mb-1">{treatment.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1 mb-3 flex-grow">
          {treatment.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-base sm:text-lg font-medium">{formatPrice(treatment.price, treatment.currency)}</span>
          <Link to={`/treatments/${treatment.id}`}>
            <Button size="sm" variant="default" className="text-xs sm:text-sm min-h-[36px] px-3 sm:px-4">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentCard;
