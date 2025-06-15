
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-brand-warm-gray-200">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-hierarchy-primary">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">Products</Link></li>
              <li><Link to="/treatments" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">Treatments</Link></li>
              <li><Link to="/about" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-hierarchy-primary">Account</h3>
            <ul className="space-y-2">
              <li><Link to="/auth" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">Sign In</Link></li>
              <li><Link to="/account" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-hierarchy-primary">Stay Connected</h3>
            <p className="text-hierarchy-secondary mb-4">Get skincare tips and exclusive offers direct to your inbox.</p>
            <div className="flex mb-4">
              <input type="email" placeholder="Your email" className="px-4 py-2 border border-brand-warm-gray-200 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-brand-plum text-brand-charcoal" />
              <Button className="rounded-l-none bg-brand-plum text-white hover:bg-brand-plum-light">
                Join
              </Button>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-hierarchy-secondary hover:text-brand-plum transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-brand-warm-gray-200 text-center text-hierarchy-secondary text-sm">
          <p>© {new Date().getFullYear()} STW Aesthetic Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
