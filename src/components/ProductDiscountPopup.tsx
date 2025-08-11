import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2, MessageCircle, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductDiscountPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductDiscountPopup: React.FC<ProductDiscountPopupProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const discountCode = "SAVE15";
  const shareText = `🎉 Get 15% OFF at STW Aesthetic Clinic! Use code ${discountCode} at checkout. Premium skincare and aesthetic treatments.`;
  const shareUrl = window.location.origin;

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

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=Special Offer - 15% OFF&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
    
    toast({
      title: "Share Link Opened",
      description: `Sharing discount offer via ${platform}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm border-0 p-0 overflow-hidden bg-white rounded-2xl shadow-2xl">
        <div className="relative">
          <div className="p-8 text-center">
            {/* Header with emoji instead of icon */}
            <div className="mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-brand-charcoal mb-2">
                Special Offer!
              </h2>
              <p className="text-brand-gray-600 text-base">
                Get <span className="font-bold text-brand-slate-blue">15% OFF</span> your order
              </p>
            </div>

            {/* Discount Code Section */}
            <div className="mb-6">
              <div className="bg-brand-off-white border-2 border-dashed border-dusty-rose-light rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl font-mono font-bold text-brand-charcoal tracking-wider">
                    {discountCode}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyCode}
                    className="h-8 w-8 p-0 hover:bg-dusty-rose-light rounded-lg"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-brand-slate-blue" />
                    ) : (
                      <Copy className="h-4 w-4 text-brand-gray-600" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleCopyCode}
                className="w-full bg-brand-slate-blue hover:bg-brand-slate-blue-light text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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

            {/* Social Share Section */}
            <div className="mb-6">
              <div className="mb-3">
                <p className="text-sm font-medium text-brand-charcoal mb-3">Share with friends</p>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="h-10 w-10 p-0 border-dusty-rose-light hover:bg-dusty-rose-light rounded-lg"
                  >
                    <Share2 className="h-4 w-4 text-brand-slate-blue" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="h-10 w-10 p-0 border-dusty-rose-light hover:bg-dusty-rose-light rounded-lg"
                  >
                    <svg className="h-4 w-4 text-brand-slate-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('whatsapp')}
                    className="h-10 w-10 p-0 border-dusty-rose-light hover:bg-dusty-rose-light rounded-lg"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-slate-blue" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('email')}
                    className="h-10 w-10 p-0 border-dusty-rose-light hover:bg-dusty-rose-light rounded-lg"
                  >
                    <Mail className="h-4 w-4 text-brand-slate-blue" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-xs text-brand-gray-600">
              Enter this code at checkout to save 15%
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDiscountPopup;