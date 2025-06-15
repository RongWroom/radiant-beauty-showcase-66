
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
};

type ProductInfoProps = {
  product: Product;
  productId: string;
};

const ProductInfo = ({ product, productId }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: productId,
      name: product.name,
      price: product.price || 0,
      currency: product.currency || 'GBP',
      image_url: product.image_url || undefined,
    }, quantity);

    toast({
      title: "Added to Cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    });
  };

  const handleBuyNow = async () => {
    if (!product) return;
    
    setIsProcessingPayment(true);
    try {
      console.log('Creating payment for product:', productId, 'quantity:', quantity);
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          productId: productId,
          quantity: quantity 
        }
      });

      if (error) {
        console.error('Payment error:', error);
        throw new Error(error.message);
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment processing failed:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-brand-silver/20">
        <h1 className="text-3xl md:text-4xl font-serif mb-2 text-brand-charcoal">{product.name}</h1>
        <p className="text-brand-gray-600 mb-4">{product.description}</p>
        <div className="text-3xl font-bold bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light bg-clip-text text-black mb-6">
          {formatPrice(product.price, product.currency)}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-4 bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-brand-silver/20">
        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="font-medium text-brand-charcoal">Quantity:</label>
          <div className="flex items-center border border-brand-silver rounded-lg overflow-hidden">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              className="px-3 py-2 hover:bg-brand-slate-blue/10 text-brand-slate-blue transition-colors"
              disabled={isProcessingPayment}
            >
              -
            </button>
            <span className="px-4 py-2 border-x border-brand-silver bg-white font-medium">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)} 
              className="px-3 py-2 hover:bg-brand-slate-blue/10 text-brand-slate-blue transition-colors"
              disabled={isProcessingPayment}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={handleBuyNow}
            disabled={isProcessingPayment}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isProcessingPayment ? 'Processing...' : 'Buy Now'}
          </Button>
          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue-dark shadow-lg"
            disabled={isProcessingPayment}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsWishlisted(!isWishlisted)} 
            className={`border-2 transition-all ${isWishlisted ? "text-red-500 border-red-400 bg-red-50" : "border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white"}`}
            disabled={isProcessingPayment}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            className="border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white"
            disabled={isProcessingPayment}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6">
        <div className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-brand-silver/20">
          <Truck className="w-6 h-6 mx-auto mb-2 text-brand-slate-blue" />
          <p className="text-sm text-brand-gray-600 font-medium">Free Shipping</p>
        </div>
        <div className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-brand-silver/20">
          <Shield className="w-6 h-6 mx-auto mb-2 text-brand-slate-blue" />
          <p className="text-sm text-brand-gray-600 font-medium">Secure Payment</p>
        </div>
        <div className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-brand-silver/20">
          <RotateCcw className="w-6 h-6 mx-auto mb-2 text-brand-slate-blue" />
          <p className="text-sm text-brand-gray-600 font-medium">30-Day Returns</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
