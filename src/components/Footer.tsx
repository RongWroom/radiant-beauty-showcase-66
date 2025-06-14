import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-brand-neutral-200">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-hierarchy-primary">Shop Now</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">New Arrivals</Link></li>
              <li><Link to="/products" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Bestsellers</Link></li>
              <li><Link to="/products" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Skincare</Link></li>
              <li><Link to="/products" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Gift Sets</Link></li>
              <li><Link to="/products" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-hierarchy-primary">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Clinic Locations</Link></li>
              <li><Link to="/about" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Sustainability</Link></li>
              <li><Link to="/contact" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Careers</Link></li>
              <li><Link to="/about" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-hierarchy-primary">Customer Care</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Book Appointment</Link></li>
              <li><Link to="/treatments" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Treatment Guide</Link></li>
              <li><Link to="/contact" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-hierarchy-primary">Join Our Newsletter</h3>
            <p className="text-hierarchy-secondary mb-4">Get skincare tips and exclusive offers direct to your inbox.</p>
            <div className="flex mb-4">
              <input type="email" placeholder="Your email" className="px-4 py-2 border border-brand-neutral-200 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-brand-sage" />
              <Button className="rounded-l-none bg-brand-lime">
                Join
              </Button>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-hierarchy-secondary hover:text-brand-sage transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-brand-neutral-200 text-center text-hierarchy-secondary text-sm">
          <p>© {new Date().getFullYear()} STW Aesthetic Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
