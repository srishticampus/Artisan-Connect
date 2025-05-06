import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axiosInstance from "../../BaseApi/baseurl";

const Addminvieworders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosInstance
            .post("/viewOrders")
            .then((response) => {
                console.log(response.data.data);

                if (response.data && Array.isArray(response.data.data)) {
                    setOrders(response.data.data);
                } else {
                    console.error("Unexpected response format:", response);
                }
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    return (
        <div className="min-h-screen flex flex-col ml-64 p-8">
            <AdminSidebar />
            <h1 className="text-2xl font-bold mb-8">Orders Overview</h1>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Order ID</th>
                                    <th className="text-left py-3 px-4">Customer</th>
                                    <th className="text-left py-3 px-4">delivery Assigned</th>
                                    <th className="text-left py-3 px-4">delivery Status</th>
                                    <th className="text-left py-3 px-4">delivery Type</th>
                                    <th className="text-left py-3 px-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-3 px-4">{order._id || `ORD-${index + 1}`}</td>
                                            <td className="py-3 px-4">{order.userid.firstname || "N/A"}</td>
                                            <td className="py-3 px-4">{order.deliveryStatus || "N/A"}</td>
                                            <td className="py-3 px-4">{order.deliveryAssigned || "N/A"}</td>
                                            <td className="py-3 px-4">{order.deliveryType || "N/A"}</td>
                                            <td className="py-3 px-4">{order.artid.price || "0.00"}</td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addminvieworders;
