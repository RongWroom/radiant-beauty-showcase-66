
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-serif font-bold">
            STW Clinic
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-800 hover:text-skin-teal transition-colors">Home</Link>
            <Link to="/treatments" className="text-gray-800 hover:text-skin-teal transition-colors">Treatments</Link>
            <a href="#" className="text-gray-800 hover:text-skin-teal transition-colors">Products</a>
            <a href="#" className="text-gray-800 hover:text-skin-teal transition-colors">About</a>
            <a href="#" className="text-gray-800 hover:text-skin-teal transition-colors">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-skin-lightgreen rounded-full transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-skin-lightgreen rounded-full transition-colors">
            <User className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-skin-lightgreen rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 bg-skin-green text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
