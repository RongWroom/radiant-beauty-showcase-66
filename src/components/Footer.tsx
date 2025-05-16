
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Shop Now</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">New Arrivals</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Bestsellers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Skincare</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Gift Sets</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Sale</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Clinic Locations</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Sustainability</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Book Appointment</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Treatment Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-4">Get skincare tips and exclusive offers direct to your inbox.</p>
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 border rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-skin-green"
              />
              <button className="bg-skin-green px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
                Join
              </button>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} STW Aesthetic Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
