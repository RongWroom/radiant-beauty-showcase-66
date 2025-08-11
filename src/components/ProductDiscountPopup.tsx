import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Copy, Check, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductDiscountPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductDiscountPopup: React.FC<ProductDiscountPopupProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const discountCode = "SAVE15";

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      toast({
        title: "Code Copied!",
        description: "Discount code SAVE15 has been copied to your clipboard. Enter it at checkout.",
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
                onClick={handleCopyCode}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied! Use at checkout
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code for Checkout
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Copy the code and enter it during Stripe checkout to get 15% off
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDiscountPopup;