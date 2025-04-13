
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Hero from '@/components/home/Hero';
import FeatureCategories from '@/components/home/FeatureCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanner from '@/components/home/PromoBanner';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import CartDrawer from '@/components/cart/CartDrawer';
import { CartProvider } from '@/hooks/useCart';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <CartProvider>
      <div>
        <Hero />
        <FeatureCategories />
        <FeaturedProducts />
        <PromoBanner />
        <NewsletterSignup />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        {/* Floating Cart Button (Mobile) */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <button 
            className="bg-shop-primary text-white p-4 rounded-full shadow-lg"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={24} />
          </button>
        </div>
      </div>
    </CartProvider>
  );
};

export default Index;
