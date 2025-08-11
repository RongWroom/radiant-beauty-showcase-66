
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Minus, Plus, X, CreditCard, Tag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { 
    items, 
    discount, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getTotalPrice, 
    getDiscountedTotal,
    removeDiscount 
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  const formatPrice = (price: number, currency: string) => {
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      console.log('Creating checkout for cart items:', items);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          items,
          couponCode: discount?.code
        }
      });

      if (error) {
        console.error('Checkout error:', error);
        throw new Error(error.message);
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        // Optionally clear cart after successful checkout creation
        // clearCart();
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to process checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-3 hover:bg-rose-50 rounded-full transition-colors relative">
          <ShoppingCart className="h-5 w-5 text-brand-warm-gray-600" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-rose-gold text-xs rounded-full h-5 w-5 flex items-center justify-center text-brand-charcoal font-medium">
              {getTotalItems()}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({getTotalItems()} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-brand-warm-gray-400" />
                <p className="text-brand-warm-gray-600">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="border border-brand-silver/30">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-silver/10 to-brand-slate-blue/5 rounded-lg overflow-hidden">
                          <img 
                            src={item.image_url || '/placeholder.svg'} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-brand-charcoal">{item.name}</h3>
                          <p className="text-sm text-brand-slate-blue font-medium">
                            {formatPrice(item.price, item.currency)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="border-t border-brand-silver/30 pt-4 mt-4">
                {discount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          {discount.code} (-{discount.percentage}%)
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={removeDiscount}
                        className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      Save {formatPrice(discount.amount, items[0]?.currency || 'GBP')}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-brand-charcoal">Subtotal:</span>
                    <span className="text-brand-charcoal">
                      {formatPrice(getTotalPrice(), items[0]?.currency || 'GBP')}
                    </span>
                  </div>
                  {discount && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount ({discount.code}):</span>
                      <span>-{formatPrice(discount.amount, items[0]?.currency || 'GBP')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t border-brand-silver/30 pt-2">
                    <span className="text-lg font-medium text-brand-charcoal">Total:</span>
                    <span className="text-xl font-bold text-brand-slate-blue">
                      {formatPrice(getDiscountedTotal(), items[0]?.currency || 'GBP')}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {isCheckingOut ? 'Processing...' : 'Checkout with Stripe'}
                  </Button>
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="w-full"
                    disabled={isCheckingOut}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
