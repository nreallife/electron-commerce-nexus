
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-shop-primary text-white">
      <div className="container py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Next-Gen Electronics <br />
              <span className="text-shop-accent">For Everyone</span>
            </h1>
            
            <p className="text-lg opacity-90 max-w-md">
              Discover cutting-edge technology and premium electronics at competitive prices with free shipping on all orders.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-shop-secondary hover:bg-shop-secondary/90 text-white"
                asChild
              >
                <Link to="/products">Shop Now</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-shop-primary"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            
            <div className="flex gap-6 pt-4">
              <div>
                <p className="text-3xl font-bold">Fast</p>
                <p className="text-sm opacity-80">Shipping</p>
              </div>
              <div className="w-px bg-white/30"></div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm opacity-80">Support</p>
              </div>
              <div className="w-px bg-white/30"></div>
              <div>
                <p className="text-3xl font-bold">30-Day</p>
                <p className="text-sm opacity-80">Returns</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="relative z-10 transform translate-x-12">
              <img 
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Featured laptop" 
                className="rounded-lg shadow-xl transform -rotate-6 animate-fade-in"
              />
            </div>
            <div className="absolute top-32 left-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Featured smartphone" 
                className="rounded-lg shadow-xl transform rotate-12 animate-fade-in"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-shop-secondary/20 transform skew-x-12 -translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-shop-accent/10 transform -skew-x-12"></div>
    </div>
  );
};

export default Hero;
