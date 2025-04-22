import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import axiosInstance from "../../BaseApi/Baseurl";

function AdminViewAgentRequest() {
  const [deliveryreq, setDeliveryreq] = useState([]);

  useEffect(() => {
    axiosInstance.post("/viewdeliveryReqs")
      .then((res) => {
        setDeliveryreq(res.data.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/5 border-r bg-white shadow-md">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Delivery Agent Requests
        </h1>

        {deliveryreq.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mt-10">
            No delivery agent requests available.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">SL</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">City</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {deliveryreq.map((a, index) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{a?.firstname}</td>
                    <td className="py-3 px-4">{a?.email}</td>
                    <td className="py-3 px-4">{a?.city}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin_viewrequestedagentdetails/${a._id}`}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        View More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminViewAgentRequest;
