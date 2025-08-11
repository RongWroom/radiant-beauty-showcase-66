import { useState, useEffect } from 'react';

// Custom hook to manage cart sheet open/close state
export const useCartSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return {
    isOpen,
    openCart,
    closeCart,
    setIsOpen
  };
};

// Global cart sheet instance
let globalCartSheetHandler: {
  openCart: () => void;
  closeCart: () => void;
} | null = null;

export const setGlobalCartSheetHandler = (handler: { openCart: () => void; closeCart: () => void; }) => {
  globalCartSheetHandler = handler;
};

export const openGlobalCart = () => {
  if (globalCartSheetHandler) {
    globalCartSheetHandler.openCart();
  }
};