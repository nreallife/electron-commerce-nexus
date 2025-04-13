
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PromoBanner = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Promo 1 */}
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Latest Laptop Models" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-shop-primary/80 to-transparent flex flex-col justify-center p-8">
              <span className="text-white text-sm font-medium mb-2">New Arrival</span>
              <h3 className="text-white text-2xl font-bold mb-4">Latest Laptop Models<br />Up to 20% Off</h3>
              <Button 
                className="bg-white text-shop-primary hover:bg-white/90 hover:text-shop-primary w-fit"
                asChild
              >
                <Link to="/category/laptops">Shop Now</Link>
              </Button>
            </div>
          </div>
          
          {/* Promo 2 */}
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Smart Accessories" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-shop-secondary/80 to-transparent flex flex-col justify-center items-end text-right p-8">
              <span className="text-white text-sm font-medium mb-2">Special Offer</span>
              <h3 className="text-white text-2xl font-bold mb-4">Smart Accessories<br />Buy 2 Get 1 Free</h3>
              <Button 
                className="bg-white text-shop-secondary hover:bg-white/90 hover:text-shop-secondary w-fit"
                asChild
              >
                <Link to="/category/accessories">View Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
