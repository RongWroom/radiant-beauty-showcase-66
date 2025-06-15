
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star } from 'lucide-react';

type ProductDetailHeaderProps = {
  featured: boolean | null;
};

const ProductDetailHeader = ({ featured }: ProductDetailHeaderProps) => {
  return (
    <section className="bg-gradient-to-r from-brand-slate-blue/5 to-brand-silver/10 py-6">
      <div className="container-custom">
        <div className="flex items-center gap-4">
          <Link to="/products">
            <Button variant="outline" size="sm" className="border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
          {featured && (
            <Badge className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light text-white shadow-lg">
              <Star className="w-4 h-4 mr-1 fill-current" />
              Featured
            </Badge>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailHeader;
