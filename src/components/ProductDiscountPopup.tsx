import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, X } from 'lucide-react';
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
      <DialogContent className="sm:max-w-sm border-0 p-0 overflow-hidden bg-white rounded-2xl shadow-2xl">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 h-7 w-7 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="p-8 text-center">
            {/* Header with emoji instead of icon */}
            <div className="mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Special Offer!
              </h2>
              <p className="text-gray-600 text-base">
                Get <span className="font-bold text-emerald-600">15% OFF</span> your order
              </p>
            </div>

            {/* Discount Code Section */}
            <div className="mb-6">
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl font-mono font-bold text-gray-900 tracking-wider">
                    {discountCode}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyCode}
                    className="h-8 w-8 p-0 hover:bg-gray-200 rounded-lg"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleCopyCode}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied! Use at checkout
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              Enter this code at checkout to save 15%
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDiscountPopup;