
import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { products } from '@/data/products';

interface ProductListProps {
  title?: string;
  products?: Product[];
  limit?: number;
}

const ProductList = ({ title, products: propProducts, limit }: ProductListProps) => {
  const displayProducts = propProducts || products;
  const limitedProducts = limit ? displayProducts.slice(0, limit) : displayProducts;

  return (
    <div className="my-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className="product-grid">
        {limitedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
