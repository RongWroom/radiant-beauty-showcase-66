
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, LogOut } from 'lucide-react';
import Cart from './Cart';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

const Navbar = () => {
  const location = useLocation();
  const { isOpen, toggle, close } = useMobileNavigation();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-brand-slate-blue font-medium" : "text-brand-charcoal hover:text-brand-slate-blue";
  };

  const handleSignOut = async () => {
    await signOut();
    close();
  };

  return (
    <>
      <nav className="bg-white py-4 sm:py-6 sticky top-0 z-50 shadow-sm border-b border-brand-gray-200">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-8 sm:space-x-12">
            <Link to="/" className="text-2xl sm:text-3xl font-serif font-bold text-hierarchy-primary" onClick={close}>
              STW
            </Link>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <Link to="/" className={`${isActive('/')} transition-colors text-base lg:text-lg`}>Home</Link>
              <Link to="/treatments" className={`${isActive('/treatments')} transition-colors text-base lg:text-lg`}>Treatments</Link>
              <Link to="/about" className={`${isActive('/about')} transition-colors text-base lg:text-lg`}>About</Link>
              <Link to="/contact" className={`${isActive('/contact')} transition-colors text-base lg:text-lg`}>Contact</Link>
              <Link to="/products" className={`${isActive('/products')} transition-colors text-base lg:text-lg`}>Products</Link>
            </div>
          </div>
          
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/account" 
                  className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center hover:bg-rose-50 rounded-full transition-colors"
                >
                  <User className="h-5 w-5 lg:h-6 lg:w-6 text-brand-gray-600 fill-current" />
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center hover:bg-rose-50 rounded-full transition-colors"
                >
                  <LogOut className="h-5 w-5 lg:h-6 lg:w-6 text-brand-gray-600" />
                </button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="min-h-[40px]">
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
              onClick={toggle}
              className="w-12 h-12 flex items-center justify-center hover:bg-rose-50 rounded-full transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-brand-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-brand-gray-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 sm:p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <Link to="/" className="text-xl sm:text-2xl font-serif font-bold text-hierarchy-primary" onClick={close}>
              STW Clinic
            </Link>
            <button 
              onClick={close}
              className="w-12 h-12 flex items-center justify-center hover:bg-rose-50 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-brand-gray-600" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-4 sm:space-y-6 flex-grow">
            <Link to="/" className={`${isActive('/')} transition-colors text-lg py-3 px-2 rounded-lg hover:bg-rose-50 touch-target`} onClick={close}>
              Home
            </Link>
            <Link to="/treatments" className={`${isActive('/treatments')} transition-colors text-lg py-3 px-2 rounded-lg hover:bg-rose-50 touch-target`} onClick={close}>
              Treatments
            </Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors text-lg py-3 px-2 rounded-lg hover:bg-rose-50 touch-target`} onClick={close}>
              About
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors text-lg py-3 px-2 rounded-lg hover:bg-rose-50 touch-target`} onClick={close}>
              Contact
            </Link>
            <Link to="/products" className={`${isActive('/products')} transition-colors text-lg py-3 px-2 rounded-lg hover:bg-rose-50 touch-target`} onClick={close}>
              Aftercare Products
            </Link>

            {user && (
              <Link to="/account" className={`${isActive('/account')} transition-colors text-lg py-3 px-2 rounded-lg hover:bg-rose-50 touch-target`} onClick={close}>
                My Account
              </Link>
            )}
          </div>

          <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t border-brand-gray-200">
            {user ? (
              <button 
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-3 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5 text-brand-gray-600" />
                <span className="text-brand-gray-600">Sign Out</span>
              </button>
            ) : (
              <Link to="/auth" onClick={close} className="w-full">
                <Button variant="outline" size="sm" className="w-full min-h-[48px]">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
