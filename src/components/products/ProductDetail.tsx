
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ProductList from './ProductList';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">Sorry, the product you are looking for does not exist.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }
  
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = isOnSale 
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) 
    : 0;
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity
    });
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm text-gray-500">
        <Button variant="link" onClick={() => navigate('/')} className="p-0 font-normal text-gray-500">
          Home
        </Button>
        <span className="mx-2">/</span>
        <Button variant="link" onClick={() => navigate(`/category/${product.category}`)} className="p-0 font-normal text-gray-500">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Button>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{product.name}</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
            
            {isOnSale && (
              <Badge className="absolute top-4 left-4 bg-shop-accent">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={cn(
                    "border rounded overflow-hidden",
                    activeImageIndex === idx ? "border-shop-primary" : "border-gray-200"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${idx + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-shop-primary/10 text-shop-primary border-shop-primary/20">
              {product.brand}
            </Badge>
            
            <Badge variant="outline" className="bg-shop-secondary/10 text-shop-secondary border-shop-secondary/20">
              {product.category}
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                  className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-gray-500">
                ({product.numReviews} reviews)
              </span>
            </div>
            
            <span className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className={cn("text-3xl font-bold", isOnSale && "text-red-600")}>
                ${product.price.toFixed(2)}
              </span>
              
              {isOnSale && (
                <span className="text-gray-500 line-through text-lg">
                  ${product.compareAtPrice?.toFixed(2)}
                </span>
              )}
              
              {isOnSale && (
                <span className="text-red-600 font-medium text-sm">
                  Save {discountPercentage}%
                </span>
              )}
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Features */}
          {product.features && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-4 py-2 border-r hover:bg-gray-100"
                disabled={!product.inStock}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.quantity}
                className="w-16 text-center py-2 focus:outline-none"
                disabled={!product.inStock}
              />
              <button
                onClick={() => quantity < product.quantity && setQuantity(quantity + 1)}
                className="px-4 py-2 border-l hover:bg-gray-100"
                disabled={!product.inStock}
              >
                +
              </button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-shop-primary hover:bg-shop-primary/90"
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button variant="outline" size="icon" className="shrink-0">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="icon" className="shrink-0">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            
            {product.features && (
              <>
                <h3>Features</h3>
                <ul>
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          {product.specifications ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium">{key}</td>
                      <td className="px-4 py-3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No specifications available for this product.</p>
          )}
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
            <p className="text-gray-500 mb-4">
              This product has {product.numReviews} reviews with an average rating of {product.rating.toFixed(1)}/5
            </p>
            <Button className="bg-shop-primary hover:bg-shop-primary/90">Write a Review</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <ProductList products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
