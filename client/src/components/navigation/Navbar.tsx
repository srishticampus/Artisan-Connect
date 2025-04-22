import React from 'react';
import { Search, ShoppingCart, Heart, User, Menu,LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate()
  const handlLogout=()=>{
    alert("logged out")
    localStorage.removeItem("buyerid")
    navigate("/buyer/login")
  }
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">ArtisanConnect</h1>
          </div>

         

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Link to={"/user_cart"}>
              <ShoppingCart className="h-6 w-6 text-gray-600" /></Link>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Link to={"/buyer/profile"}> <User className="h-6 w-6 text-gray-600" /></Link>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handlLogout}>
              <LogIn className="h-6 w-6 text-gray-600" />
            </button>
          </div>

         
        </div>
      </div>

      <div className="bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 h-12 text-sm">
            <Link to="/buyer/homepage" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/gallery" className="text-gray-600 hover:text-indigo-600">Gallery</Link>
            <Link to="/view_artists" className="text-gray-600 hover:text-indigo-600">Artisans</Link>
            <Link to="/view_orders" className="text-gray-600 hover:text-indigo-600">Orders</Link>
            <Link to="/buyer/trackorder" className="text-gray-600 hover:text-indigo-600">Track Orders</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;