
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-brand-sage font-medium" : "text-brand-neutral-800 hover:text-brand-sage";
  };

  return (
    <nav className="bg-white py-6 sticky top-0 z-50 shadow-sm border-b border-brand-neutral-200">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-3xl font-serif font-bold text-hierarchy-primary">
            STW Clinic
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors text-lg`}>Home</Link>
            <Link to="/treatments" className={`${isActive('/treatments')} transition-colors text-lg`}>Treatments</Link>
            <Link to="/products" className={`${isActive('/products')} transition-colors text-lg`}>Products</Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors text-lg`}>About</Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors text-lg`}>Contact</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-3 hover:bg-brand-cream rounded-full transition-colors">
            <Search className="h-5 w-5 text-brand-neutral-600" />
          </button>
          <button className="p-3 hover:bg-brand-cream rounded-full transition-colors">
            <User className="h-5 w-5 text-brand-neutral-600" />
          </button>
          <button className="p-3 hover:bg-brand-cream rounded-full transition-colors relative">
            <ShoppingCart className="h-5 w-5 text-brand-neutral-600" />
            <span className="absolute -top-1 -right-1 bg-brand-lime text-xs rounded-full h-5 w-5 flex items-center justify-center text-brand-neutral-900 font-medium">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
