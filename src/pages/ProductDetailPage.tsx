
import React from 'react';
import { CartProvider } from '@/hooks/useCart';
import ProductDetail from '@/components/products/ProductDetail';

const ProductDetailPage = () => {
  return (
    <CartProvider>
      <ProductDetail />
    </CartProvider>
  );
};

export default ProductDetailPage;
