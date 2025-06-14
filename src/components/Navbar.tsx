
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-brand-plum font-medium" : "text-brand-charcoal hover:text-brand-plum";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white py-6 sticky top-0 z-50 shadow-sm border-b border-brand-warm-gray-200">
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
        
        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-3 hover:bg-brand-champagne rounded-full transition-colors">
            <Search className="h-5 w-5 text-brand-warm-gray-600" />
          </button>
          <button className="p-3 hover:bg-brand-champagne rounded-full transition-colors">
            <User className="h-5 w-5 text-brand-warm-gray-600" />
          </button>
          <button className="p-3 hover:bg-brand-champagne rounded-full transition-colors relative">
            <ShoppingCart className="h-5 w-5 text-brand-warm-gray-600" />
            <span className="absolute -top-1 -right-1 bg-brand-rose-gold text-xs rounded-full h-5 w-5 flex items-center justify-center text-brand-charcoal font-medium">
              0
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button className="p-2 hover:bg-brand-champagne rounded-full transition-colors relative">
            <ShoppingCart className="h-5 w-5 text-brand-warm-gray-600" />
            <span className="absolute -top-1 -right-1 bg-brand-rose-gold text-xs rounded-full h-4 w-4 flex items-center justify-center text-brand-charcoal font-medium text-xs">
              0
            </span>
          </button>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-brand-champagne rounded-full transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-brand-warm-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-brand-warm-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-serif font-bold text-hierarchy-primary" onClick={closeMobileMenu}>
              STW Clinic
            </Link>
            <button 
              onClick={closeMobileMenu}
              className="p-2 hover:bg-brand-champagne rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-brand-warm-gray-600" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-6">
            <Link to="/" className={`${isActive('/')} transition-colors text-lg py-2`} onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/treatments" className={`${isActive('/treatments')} transition-colors text-lg py-2`} onClick={closeMobileMenu}>
              Treatments
            </Link>
            <Link to="/products" className={`${isActive('/products')} transition-colors text-lg py-2`} onClick={closeMobileMenu}>
              Products
            </Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors text-lg py-2`} onClick={closeMobileMenu}>
              About
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors text-lg py-2`} onClick={closeMobileMenu}>
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4 mt-8 pt-8 border-t border-brand-warm-gray-200">
            <button className="p-3 hover:bg-brand-champagne rounded-full transition-colors">
              <Search className="h-5 w-5 text-brand-warm-gray-600" />
            </button>
            <button className="p-3 hover:bg-brand-champagne rounded-full transition-colors">
              <User className="h-5 w-5 text-brand-warm-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
