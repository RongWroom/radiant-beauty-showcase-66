
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Share2, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react';
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
  sizes?: {
    default: { size: string; price: number };
    options: { size: string; price: number }[];
  };
};

type ProductInfoProps = {
  product: Product;
  productId: string;
};

const ProductInfo = ({ product, productId }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.default || { size: "Standard", price: product.price || 0 }
  );
  const { toast } = useToast();
  const { addToCart } = useCart();

  const hasMultipleSizes = product.sizes && product.sizes.options.length > 1;
  
  const getCurrentPrice = () => {
    return product.sizes ? selectedSize.price : (product.price || 0);
  };

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const productName = hasMultipleSizes ? `${product.name} (${selectedSize.size})` : product.name;
    addToCart({
      id: `${productId}-${selectedSize.size}`,
      name: productName,
      price: getCurrentPrice(),
      currency: product.currency || 'GBP',
      image_url: product.image_url || undefined,
    }, quantity);

    toast({
      title: "Added to Cart",
      description: `${productName} (${quantity}) has been added to your cart.`,
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
          quantity: quantity,
          selectedSize: selectedSize 
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

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description || `Check out ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Product shared successfully!",
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Product link copied to clipboard!",
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Product link copied to clipboard!",
        });
      } catch (clipboardError) {
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-sm border border-brand-silver/20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2 text-brand-charcoal leading-tight">{product.name}</h1>
        <p className="text-brand-gray-600 mb-4 text-sm sm:text-base">{product.description}</p>
        
        {hasMultipleSizes && (
          <div className="mb-4 space-y-2">
            <Label htmlFor="size-select" className="text-sm font-medium text-brand-charcoal">
              Size
            </Label>
            <Select
              value={selectedSize.size}
              onValueChange={(size) => {
                const option = product.sizes?.options.find(opt => opt.size === size);
                if (option) setSelectedSize(option);
              }}
            >
              <SelectTrigger id="size-select" className="w-full max-w-xs">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes?.options.map((option) => (
                  <SelectItem key={option.size} value={option.size}>
                    {option.size} - {formatPrice(option.price, product.currency)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light bg-clip-text text-black mb-6">
          {formatPrice(getCurrentPrice(), product.currency)}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-4 bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-sm border border-brand-silver/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <label htmlFor="quantity" className="font-medium text-brand-charcoal text-sm sm:text-base">Quantity:</label>
          <div className="flex items-center border border-brand-silver rounded-lg overflow-hidden w-fit">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              className="px-3 py-2 sm:px-4 sm:py-2 hover:bg-brand-slate-blue/10 text-brand-slate-blue transition-colors min-w-[44px] text-lg font-medium"
              disabled={isProcessingPayment}
            >
              -
            </button>
            <span className="px-3 py-2 sm:px-4 sm:py-2 border-x border-brand-silver bg-white font-medium min-w-[60px] text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)} 
              className="px-3 py-2 sm:px-4 sm:py-2 hover:bg-brand-slate-blue/10 text-brand-slate-blue transition-colors min-w-[44px] text-lg font-medium"
              disabled={isProcessingPayment}
            >
              +
            </button>
          </div>
        </div>

        {/* Mobile-first button layout */}
        <div className="space-y-3">
          {/* Primary buttons - stacked on mobile, side by side on larger screens */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleBuyNow}
              disabled={isProcessingPayment}
              className="w-full sm:flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg text-sm sm:text-base py-3 sm:py-4 min-h-[48px]"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {isProcessingPayment ? 'Processing...' : 'Buy Now'}
            </Button>
            <Button 
              onClick={handleAddToCart}
              className="w-full sm:flex-1 bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue-dark shadow-lg text-sm sm:text-base py-3 sm:py-4 min-h-[48px]"
              disabled={isProcessingPayment}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
          
          {/* Share button - full width on mobile */}
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="w-full border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white text-sm sm:text-base py-3 sm:py-4 min-h-[48px]"
            disabled={isProcessingPayment}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Product
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
        <div className="text-center bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-brand-silver/20">
          <Truck className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-brand-slate-blue" />
          <p className="text-xs sm:text-sm text-brand-gray-600 font-medium">Free Shipping</p>
        </div>
        <div className="text-center bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-brand-silver/20">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-brand-slate-blue" />
          <p className="text-xs sm:text-sm text-brand-gray-600 font-medium">Secure Payment</p>
        </div>
        <div className="text-center bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-brand-silver/20">
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-brand-slate-blue" />
          <p className="text-xs sm:text-sm text-brand-gray-600 font-medium">30-Day Returns</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
