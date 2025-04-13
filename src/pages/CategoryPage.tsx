
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/products/ProductList';
import { products, categories } from '@/data/products';
import { CartProvider } from '@/hooks/useCart';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const category = categories.find(c => c.slug === slug);
  const filteredProducts = products.filter(product => product.category === slug);
  
  if (!category) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
        <p className="mb-8">Sorry, the category you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="container py-8">
        <div className="flex items-center mb-6 text-sm text-gray-500">
          <Button variant="link" asChild className="p-0 font-normal text-gray-500">
            <Link to="/">Home</Link>
          </Button>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{category.name}</span>
        </div>
        
        <div className="relative mb-8">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="ml-8 text-white">
              <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
              {category.description && (
                <p className="max-w-md">{category.description}</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
              <p className="text-gray-500 mb-8">
                We couldn't find any products in this category. Check back later!
              </p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </CartProvider>
  );
};

export default CategoryPage;
