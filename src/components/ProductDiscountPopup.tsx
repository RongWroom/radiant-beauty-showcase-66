import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Copy, Check, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/hooks/use-toast";

interface ProductDiscountPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductDiscountPopup: React.FC<ProductDiscountPopupProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { applyDiscount } = useCart();
  const { toast } = useToast();

  const discountCode = "SAVE15";

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      toast({
        title: "Code Copied!",
        description: "Discount code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the code manually: " + discountCode,
        variant: "destructive",
      });
    }
  };

  const handleApplyAndShop = () => {
    applyDiscount(discountCode, 15);
    toast({
      title: "Discount Applied!",
      description: "15% off has been applied to your cart",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-brand-slate-blue/5 via-brand-silver/10 to-brand-slate-blue/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 z-10 h-8 w-8 p-0 hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="p-6 text-center">
            <div className="mb-4">
              <Gift className="h-16 w-16 mx-auto text-brand-slate-blue" />
            </div>
            
            <DialogHeader className="space-y-2 mb-6">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Wait! Don't Miss Out!
              </DialogTitle>
              <p className="text-brand-gray-600 text-lg">
                Get <span className="font-bold text-brand-slate-blue">15% OFF</span> your entire order
              </p>
            </DialogHeader>

            <Card className="p-4 bg-white/50 border-2 border-dashed border-brand-slate-blue/30 mb-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-bold tracking-wider text-gray-900">
                  {discountCode}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  className="h-8 w-8 p-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Click to copy discount code
              </p>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleApplyAndShop}
                className="w-full bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-dark hover:to-brand-slate-blue text-white font-semibold py-3"
              >
                Apply Discount & Continue Shopping
              </Button>
              
              <Button
                variant="outline"
                onClick={handleCopyCode}
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Code Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code Only
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              This offer is valid for your current session only
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDiscountPopup;