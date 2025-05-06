import React from 'react';
import { Search, ShoppingCart, Heart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeliveryNavbar = () => {
  return (
    <nav className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">ArtisanConnect</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
             
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
           
            <button className="p-2 hover:bg-gray-100 rounded-full">
             <Link to={"/deliveryagent/profile"} ><User className="h-6 w-6 text-gray-600" /></Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 h-12 text-sm">
            <Link to="/deliveryagent/homepage" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/delivery_agent_routes" className="text-gray-600 hover:text-indigo-600">Delivery request</Link>
            <Link to="/delivery_agent_jobs" className="text-gray-600 hover:text-indigo-600">Job</Link>
            <Link to="" className="text-gray-600 hover:text-indigo-600">New Arrivals</Link>
            <Link to="" className="text-gray-600 hover:text-indigo-600">Deals</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DeliveryNavbar;