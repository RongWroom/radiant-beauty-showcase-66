
import React from 'react';

type ProductImageProps = {
  imageUrl: string | null;
  name: string;
};

const ProductImage = ({ imageUrl, name }: ProductImageProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-to-br from-brand-silver/10 to-brand-slate-blue/5 rounded-xl overflow-hidden shadow-lg border border-brand-silver/30">
        <img 
          src={imageUrl || '/placeholder.svg'} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default ProductImage;
