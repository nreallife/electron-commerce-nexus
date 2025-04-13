
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const categories = [
    { name: 'Laptops', path: '/category/laptops' },
    { name: 'Smartphones', path: '/category/smartphones' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Audio', path: '/category/audio' },
    { name: 'Wearables', path: '/category/wearables' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-shop-primary text-white font-bold p-2 rounded">
              RBV
            </div>
            <span className="text-xl font-bold text-shop-dark hidden md:block">RBVichElectronics</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-gray-600 hover:text-shop-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search, Cart, Account */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-shop-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <Link to="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-fade-in">
            <ul className="flex flex-col space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-gray-600 hover:text-shop-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
