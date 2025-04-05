import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-green-400">Blink</span>
              <span className="text-yellow-300">It</span>
            </h3>
            <p className="text-gray-300">
              Fresh groceries delivered at your doorstep in minutes.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/items" className="text-gray-300 hover:text-white">All Items</Link></li>
              <li><Link to="/discounts" className="text-gray-300 hover:text-white">Discounts</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white">My Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/fruits-veggies" className="text-gray-300 hover:text-white">Fruits & Vegetables</Link></li>
              <li><Link to="/snacks" className="text-gray-300 hover:text-white">Snacks</Link></li>
              <li><Link to="/cold-drinks" className="text-gray-300 hover:text-white">Cold Drinks</Link></li>
              <li><Link to="/dairy-products" className="text-gray-300 hover:text-white">Dairy Products</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} BlinkIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
