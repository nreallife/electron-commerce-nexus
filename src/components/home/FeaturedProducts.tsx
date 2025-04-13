
import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '@/components/products/ProductList';
import { featuredProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Button variant="ghost" className="flex items-center hover:text-shop-primary" asChild>
            <Link to="/products">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <ProductList products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
