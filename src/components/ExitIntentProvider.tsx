import React from 'react';
import { useExitIntent } from '@/hooks/useExitIntent';
import { useCart } from '@/contexts/CartContext';
import ExitIntentDiscountPopup from './ExitIntentDiscountPopup';

interface ExitIntentProviderProps {
  children: React.ReactNode;
}

const ExitIntentProvider: React.FC<ExitIntentProviderProps> = ({ children }) => {
  const { showPopup, hidePopup } = useExitIntent();
  const { items, discount } = useCart();

  // Don't show popup if user already has items in cart or already has a discount applied
  const shouldShowPopup = showPopup && items.length === 0 && !discount;

  return (
    <>
      {children}
      <ExitIntentDiscountPopup 
        isOpen={shouldShowPopup} 
        onClose={hidePopup} 
      />
    </>
  );
};

export default ExitIntentProvider;