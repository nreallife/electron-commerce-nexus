
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types/product';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage and calculate totals when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    const price = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        toast({
          title: 'Cart updated',
          description: `${product.name} quantity updated in cart`,
        });
        
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + product.quantity } 
            : item
        );
      } else {
        toast({
          title: 'Added to cart',
          description: `${product.name} added to your cart`,
        });
        
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.id === productId);
      
      if (product) {
        toast({
          title: 'Removed from cart',
          description: `${product.name} removed from your cart`,
        });
      }
      
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
