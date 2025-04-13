
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
  };

  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = isOnSale 
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) 
    : 0;

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {isOnSale && (
          <Badge className="absolute top-4 left-4 bg-shop-accent">
            {discountPercentage}% OFF
          </Badge>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            onClick={handleAddToCart} 
            variant="ghost" 
            className="w-full hover:bg-shop-primary hover:text-white text-white"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-shop-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-baseline gap-1">
            <span className={cn("font-bold text-lg", isOnSale && "text-red-600")}>
              ${product.price.toFixed(2)}
            </span>
            
            {isOnSale && (
              <span className="text-gray-500 line-through text-sm">
                ${product.compareAtPrice?.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
          </div>
          
          <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
