
import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image_url?: string;
};

export type DiscountInfo = {
  code: string;
  percentage: number;
  amount: number;
};

type CartContextType = {
  items: CartItem[];
  discount: DiscountInfo | null;
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getDiscountedTotal: () => number;
  applyDiscount: (code: string, percentage: number) => void;
  removeDiscount: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<DiscountInfo | null>(null);

  // Load cart and discount from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    const savedDiscount = localStorage.getItem('cart-discount');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    if (savedDiscount) {
      setDiscount(JSON.parse(savedDiscount));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(items));
  }, [items]);

  // Save discount to localStorage whenever discount changes
  useEffect(() => {
    if (discount) {
      localStorage.setItem('cart-discount', JSON.stringify(discount));
    } else {
      localStorage.removeItem('cart-discount');
    }
  }, [discount]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(null);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscountedTotal = () => {
    const total = getTotalPrice();
    if (discount) {
      return total - discount.amount;
    }
    return total;
  };

  const applyDiscount = (code: string, percentage: number) => {
    const total = getTotalPrice();
    const discountAmount = total * (percentage / 100);
    setDiscount({
      code,
      percentage,
      amount: discountAmount
    });
  };

  const removeDiscount = () => {
    setDiscount(null);
  };

  return (
    <CartContext.Provider value={{
      items,
      discount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      getDiscountedTotal,
      applyDiscount,
      removeDiscount,
    }}>
      {children}
    </CartContext.Provider>
  );
};
