
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Menu, X, LogOut } from 'lucide-react';
import Cart from './Cart';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-brand-plum font-medium" : "text-brand-charcoal hover:text-brand-plum";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
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
          
          {user ? (
            <div className="flex items-center space-x-2">
              <Link 
                to="/account" 
                className="p-3 hover:bg-brand-champagne rounded-full transition-colors"
              >
                <User className="h-5 w-5 text-brand-warm-gray-600" />
              </Link>
              <button 
                onClick={handleSignOut}
                className="p-3 hover:bg-brand-champagne rounded-full transition-colors"
              >
                <LogOut className="h-5 w-5 text-brand-warm-gray-600" />
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}
          
          <Cart />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Cart />
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

            {user && (
              <Link to="/account" className={`${isActive('/account')} transition-colors text-lg py-2`} onClick={closeMobileMenu}>
                My Account
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4 mt-8 pt-8 border-t border-brand-warm-gray-200">
            <button className="p-3 hover:bg-brand-champagne rounded-full transition-colors">
              <Search className="h-5 w-5 text-brand-warm-gray-600" />
            </button>
            
            {user ? (
              <button 
                onClick={handleSignOut}
                className="p-3 hover:bg-brand-champagne rounded-full transition-colors"
              >
                <LogOut className="h-5 w-5 text-brand-warm-gray-600" />
              </button>
            ) : (
              <Link to="/auth" onClick={closeMobileMenu}>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
