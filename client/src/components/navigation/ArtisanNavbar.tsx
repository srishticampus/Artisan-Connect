import React from "react";
import { Search, ShoppingCart, Heart, User, Menu, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ArtisanNavbar = () => {
  const navigate=useNavigate()
  const handlLogout=()=>{
    alert("logged out")
    localStorage.removeItem("artisanid")
    navigate("/artisan/login")
  }
  return (
    <nav className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">
              ArtisanConnect
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for artisan products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
            <Link to={"/artisan/profile"}> <User className="h-6 w-6 text-gray-600" /></Link>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <LogIn className="h-6 w-6 text-gray-600" onClick={handlLogout} />
              </button>
          </div>

          {/* Mobile Menu Button */}
          
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 h-12 text-sm">
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Categories
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Featured Artisans
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              New Arrivals
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Deals
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ArtisanNavbar;
