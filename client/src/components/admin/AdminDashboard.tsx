import React, { useEffect, useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import Footer from "../footer/Footer";
import axiosInstance from "../../BaseApi/baseurl";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [artistCount, setArtistCount] = useState(0);
  const [deliveryCount, setDeliveryCount] = useState(0);
  const [artworkCount, setArtworkCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [ordercount, setOrderCount] = useState(0);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersRes = await axiosInstance.post("/viewUsers");
        const artistsRes = await axiosInstance.post("/viewArtists");
        const deliveryRes = await axiosInstance.post("/viewdeliverys");
        const artworksRes = await axiosInstance.post("/viewArtworks");

        const orders = await axiosInstance.post("/viewOrders");
        const cart = await axiosInstance.post("/viewCart");

        setUserCount(usersRes.data.data?.length || 0);
        setArtistCount(artistsRes.data.data?.length || 0);
        setDeliveryCount(deliveryRes.data.data?.length || 0);
        setArtworkCount(artworksRes.data.data?.length || 0);
        setCartCount(cart.data.data?.length || 0);
        setOrderCount(orders.data.data?.length || 0);

      } catch (err) {
        console.error("Failed to fetch dashboard counts:", err);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: userCount,
      color: "bg-blue-500",
    },
   
    {
      icon:  Users,
      // icon: DollarSign,
      label: "Total Artists",
      value: artistCount,
      color: "bg-yellow-500",
    },
    {
      
      icon: Users,
      label: "Total Deliveries",
      value: deliveryCount,
      color: "bg-purple-500",
    },
    {
      // icon: Users,
      icon: ShoppingBag,
      label: "Total Artworks",
      value: artworkCount,
      
      color: "bg-green-500",
    },
    {
      // icon: Users,
      icon: TrendingUp,
      label: "Total Oders",
      value: ordercount,
      
      color: "bg-red-500",
    } ,{
      icon: Package,
      // icon: ShoppingBag,
      label: "Total CartItem",
      value: cartCount,
      
      color: "bg-pink-500",
    }
  ];

  // const recentOrders = [
  //   {
  //     id: "#ORD-001",
  //     customer: "John Doe",
  //     status: "Completed",
  //     amount: "$120.00",
  //   },
  //   {
  //     id: "#ORD-002",
  //     customer: "Jane Smith",
  //     status: "Processing",
  //     amount: "$85.50",
  //   },
  //   {
  //     id: "#ORD-003",
  //     customer: "Mike Johnson",
  //     status: "Pending",
  //     amount: "$220.00",
  //   },
  //   {
  //     id: "#ORD-004",
  //     customer: "Sarah Williams",
  //     status: "Completed",
  //     amount: "$175.25",
  //   },
  // ];
const navigate=useNavigate()
  const product=()=>{
    navigate("/admin/products")
  }
  const order=()=>{
    navigate("/admin/orders")
  }
  const complaints=()=>{
    navigate("/admin/complaints")
  }
  return (
    <>
      <div className="min-h-screen flex flex-col ml-64 p-8">
        <AdminSidebar />
        <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                    <div className="flex items-center">
                      <p className="text-2xl font-semibold">{stat.value}</p>
                     
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders 
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{order.amount}</td>
                      <td className="py-3 px-4">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>*/}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <button onClick={product} className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <Package className="h-5 w-5 text-indigo-600" />
            <span> New Products</span>
          </button>
          <button onClick={order} className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <ShoppingCart className="h-5 w-5 text-indigo-600" />
            <span>View All Orders</span>
          </button>
          <button onClick={complaints} className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <AlertCircle className="h-5 w-5 text-indigo-600" />
            <span>Complaints</span>
          </button>
          {/* <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <CheckCircle className="h-5 w-5 text-indigo-600" />
            <span>Approve Listings</span>
          </button>  */}
        </div>

      </div>
    </>
  );
};

export default AdminDashboard;
