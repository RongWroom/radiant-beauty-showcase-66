
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
        <div className="relative h-96 lg:h-full">
          <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="font-medium px-3 py-1 bg-brand-silver text-brand-charcoal">
              <Star className="w-4 h-4 mr-1" />
              Most Popular
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-slate-blue/90 to-transparent p-4 text-white">
            <h3 className="font-serif text-xl font-medium text-white">{treatment.name}</h3>
            <p className="text-sm mt-1 mb-2 line-clamp-2">
              {treatment.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-medium text-brand-light-gray">{formatPrice(treatment.price, treatment.currency)}</span>
              <Link to={`/treatments/${treatment.id}`}>
                <Button size="sm" variant="secondary" className="bg-brand-silver text-brand-charcoal hover:bg-brand-silver-light">Read More</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-serif text-lg font-medium">{treatment.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">
          {treatment.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-medium">{formatPrice(treatment.price, treatment.currency)}</span>
          <Link to={`/treatments/${treatment.id}`}>
            <Button size="sm" variant="default">Read More</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentCard;
