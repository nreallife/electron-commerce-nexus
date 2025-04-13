
import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  return (
    <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            <h2 className="text-lg font-semibold">Shopping Cart ({totalItems})</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Cart Items */}
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <Link 
                        to={`/product/${item.id}`} 
                        onClick={onClose} 
                        className="font-medium hover:text-shop-primary"
                      >
                        {item.name}
                      </Link>
                      <div className="text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 p-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  className="w-full bg-shop-primary hover:bg-shop-primary/90"
                  onClick={() => {
                    onClose();
                    // Here you would navigate to checkout
                  }}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-red-500 hover:text-red-700"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 text-center mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button 
              onClick={() => {
                onClose();
                // Here you would navigate to shop
              }}
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
