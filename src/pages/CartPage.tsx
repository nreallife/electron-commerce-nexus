
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartProvider, useCart } from '@/hooks/useCart';
import { Separator } from '@/components/ui/separator';

const CartPageContent = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild className="bg-shop-primary hover:bg-shop-primary/90">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="link" asChild className="p-0 mr-4">
          <Link to="/">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Your Cart ({totalItems} items)</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="hidden md:grid md:grid-cols-5 text-sm font-medium text-gray-500 mb-4">
              <div className="md:col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>
            
            <Separator className="mb-6" />
            
            {cart.map((item) => (
              <div key={item.id} className="py-6 border-b last:border-b-0">
                <div className="md:grid md:grid-cols-5 gap-4 flex flex-col">
                  {/* Product */}
                  <div className="md:col-span-2 flex gap-4">
                    <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </Link>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-shop-primary">
                        {item.name}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-sm text-red-500 hover:text-red-600 flex items-center mt-2"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:text-center flex md:block justify-between items-center mt-4 md:mt-0">
                    <span className="md:hidden text-gray-500">Price:</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:flex md:justify-center flex justify-between items-center mt-4 md:mt-0">
                    <span className="md:hidden text-gray-500">Quantity:</span>
                    <div className="flex items-center border rounded">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="w-12 text-center border-0 focus:ring-0"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:text-right flex md:block justify-between items-center mt-4 md:mt-0">
                    <span className="md:hidden text-gray-500">Total:</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-6 flex justify-between">
              <Button 
                variant="outline" 
                className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
              
              <Button 
                variant="outline"
                asChild
              >
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at checkout</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6 bg-shop-primary hover:bg-shop-primary/90"
            >
              Proceed to Checkout
            </Button>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">We Accept</h3>
              <div className="flex gap-2">
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
};

export default CartPage;
