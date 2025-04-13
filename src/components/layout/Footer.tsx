
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-shop-dark text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About RBVichElectronics</h3>
            <p className="text-gray-300">
              Your trusted destination for high-quality electronics and tech accessories.
              We offer competitive prices and exceptional customer service.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/laptops" className="text-gray-300 hover:text-white">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/smartphones" className="text-gray-300 hover:text-white">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-300 hover:text-white">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/audio" className="text-gray-300 hover:text-white">
                  Audio
                </Link>
              </li>
              <li>
                <Link to="/category/wearables" className="text-gray-300 hover:text-white">
                  Wearables
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-shop-secondary" />
                <span className="text-gray-300">123 Tech Avenue, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-shop-secondary" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-shop-secondary" />
                <span className="text-gray-300">support@rbvichelectronics.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} RBVichElectronics. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
