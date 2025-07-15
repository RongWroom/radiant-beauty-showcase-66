
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-dark text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 text-white">
              STW Aesthetic Clinic
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-brand-silver to-white rounded-full mb-4"></div>
            <p className="text-white/90 leading-relaxed mb-6">
              Your trusted partner for advanced aesthetic treatments and skincare solutions in Stanley.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/STWAestheticClinic" target="_blank" rel="noopener noreferrer" 
                 className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-105" 
                 aria-label="Follow us on Facebook">
                <Facebook className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <div className="w-12 h-0.5 bg-brand-silver rounded-full mb-4"></div>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Treatments</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Products</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <div className="w-12 h-0.5 bg-brand-silver rounded-full mb-4"></div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-brand-silver mt-1 flex-shrink-0" />
                <div className="text-white/80 text-sm leading-relaxed">
                  <p>The Treatment Rooms</p>
                  <p>110 Front Street</p>
                  <p>Stanley, United Kingdom</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-silver flex-shrink-0" />
                <a href="tel:01207239983" className="text-white/80 hover:text-white transition-colors text-sm">
                  01207 239983
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-silver flex-shrink-0" />
                <a href="mailto:sharon@stwaestheticclinic.co.uk" className="text-white/80 hover:text-white transition-colors text-sm break-all">
                  sharon@stwaestheticclinic.co.uk
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Opening Hours</h4>
            <div className="w-12 h-0.5 bg-brand-silver rounded-full mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-brand-silver mt-1 flex-shrink-0" />
                <div className="text-white/80 text-sm leading-relaxed">
                  <div className="flex justify-between mb-1">
                    <span className="mx-[8px]">Tues - Thurs</span>
                    <span>10AM - 6PM</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="px-0 mx-[8px]">Saturday</span>
                    <span>Closed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="mx-[8px]">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-white/70 text-sm text-center sm:text-left">
              <p>© {new Date().getFullYear()} STW Aesthetic Clinic. All rights reserved.</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
                <Link to="/privacy" className="text-white/60 hover:text-white/80 transition-colors text-xs">
                  Privacy Policy
                </Link>
                <span className="text-white/40">•</span>
                <Link to="/terms" className="text-white/60 hover:text-white/80 transition-colors text-xs">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="text-white/70 text-sm text-center sm:text-right">
              <p>
                Website: <a href="https://stwaestheticclinic.co.uk" target="_blank" rel="noopener noreferrer" 
                           className="text-white/80 hover:text-white transition-colors">
                  stwaestheticclinic.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
