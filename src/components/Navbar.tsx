
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Badge } from '@/components/ui/badge';
import Cart from '@/components/Cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4 tablet:py-6 tablet:px-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-slate-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">STW</span>
            </div>
            <span className="font-serif text-xl font-bold text-brand-charcoal">
              STW Aesthetic Clinic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden tablet:flex items-center space-x-4 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors text-sm lg:text-base px-2 py-1 ${
                  isActive(item.href)
                    ? 'text-brand-slate-blue border-b-2 border-brand-slate-blue'
                    : 'text-brand-gray-600 hover:text-brand-slate-blue'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden tablet:flex items-center space-x-2 lg:space-x-4">
            <Cart />
            {user ? (
              <div className="flex items-center space-x-2 lg:space-x-3">
                {isAdmin && (
                  <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                    <Shield className="h-3 w-3" />
                    <span className="hidden lg:inline">ADMIN</span>
                  </Badge>
                )}
                <Link
                  to="/account"
                  className="flex items-center space-x-1 lg:space-x-2 text-brand-gray-600 hover:text-brand-slate-blue transition-colors text-sm lg:text-base"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Account</span>
                </Link>
                <button
                  onClick={signOut}
                  className="text-brand-gray-600 hover:text-brand-slate-blue transition-colors text-sm lg:text-base"
                >
                  <span className="hidden lg:inline">Sign Out</span>
                  <span className="lg:hidden">Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-brand-slate-blue text-white px-3 lg:px-4 py-2 rounded-md hover:bg-brand-slate-blue/90 transition-colors text-sm lg:text-base"
              >
                <span className="hidden lg:inline">Sign In</span>
                <span className="lg:hidden">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="tablet:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-gray-600 hover:text-brand-slate-blue focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="tablet:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-40">
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-brand-slate-blue'
                      : 'text-brand-gray-600 hover:text-brand-slate-blue'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
               <div className="pt-4 border-t">
                 <div className="mb-4">
                   <Cart />
                 </div>
                 {user ? (
                  <div className="space-y-3">
                    {isAdmin && (
                      <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                        <Shield className="h-3 w-3" />
                        ADMIN
                      </Badge>
                    )}
                    <Link
                      to="/account"
                      className="flex items-center space-x-2 text-brand-gray-600 hover:text-brand-slate-blue transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="text-brand-gray-600 hover:text-brand-slate-blue transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="block bg-brand-slate-blue text-white px-4 py-2 rounded-md hover:bg-brand-slate-blue/90 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
