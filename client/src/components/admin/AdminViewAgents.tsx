import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../BaseApi/Baseurl';

function AdminViewAgents() {
  const [delivery, setDelivery] = useState([]);
  const adminid = localStorage.getItem("adminid");
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminid) {
      navigate("/admin/login");
    }

    axiosInstance.post('viewdeliverys')
      .then((res) => {
        setDelivery(res.data.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [adminid, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/5 border-r bg-white shadow-md">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Delivery Agents</h1>
          <Link to="/admin_viewagentrequests">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200">
              View Requests
            </button>
          </Link>
        </div>

        {delivery.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mt-10">
            No Delivery Agents Found
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">SL</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Contact</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Aadhar</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">District</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {delivery.map((a, index) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{a?.name}</td>
                    <td className="py-3 px-4">{a?.email}</td>
                    <td className="py-3 px-4">{a?.contact}</td>
                    <td className="py-3 px-4">{a?.aadhar}</td>
                    <td className="py-3 px-4">{a?.district}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin_viewdeliveryagentindividua/${a._id}`}
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

export default AdminViewAgents;
