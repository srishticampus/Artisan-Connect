import React from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Settings,
  BarChart,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/homepage" },
    { icon: Users, label: "Users", path: "/admin/viewuser" },
    // { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Users, label: "Artists", path: "/admin/viewartist" },
    { icon: Users, label: "Delivery Agents", path: "/admin/viewagent" },
    { icon: ShoppingBag, label: "Orders", path: "/admin/orders" },
    { icon: Package, label: "Products", path: "/admin/products" },
    // { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("adminid");
    navigate("/admin/login")
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-indigo-500">Admin Panel</h1>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <button  onClick={handleLogout} className="flex items-center space-x-3 text-gray-300 hover:text-white w-full px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
