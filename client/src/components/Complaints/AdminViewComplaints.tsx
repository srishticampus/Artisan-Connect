import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseApi/baseurl';
import AdminSidebar from '../admin/AdminSidebar';

function AdminViewComplaints() {
    const [buyerComplaints, setBuyerComplaints] = useState([]);
    const [artisanComplaints, setArtisanComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const [buyerRes, artisanRes] = await Promise.all([
                axiosInstance.get('/buyer/viewComplaints'),
                axiosInstance.get('/artisan/viewComplaints'),
            ]);

            setBuyerComplaints(buyerRes.data.data);
            setArtisanComplaints(artisanRes.data.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    return (
        <div className='row'>
            <div className='col-3'>    <AdminSidebar />
            </div>
            <div className="col-9 mx-auto mt-6 p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Complaint Dashboard</h1>


                <>
                    {/* Buyer Complaints Section */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Buyer Complaints</h2>
                        {buyerComplaints.length === 0 ? (
                            <p className="text-gray-600">No buyer complaints found.</p>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {buyerComplaints.map((complaint, index) => (
                                    <div
                                        key={index}
                                        className="card border p-4 rounded-lg shadow bg-white"
                                    >
                                        <p className="mb-1"><strong>Name:</strong> {complaint.buyerId?.firstname || 'N/A'}</p>
                                        <p className="mb-1"><strong>Email:</strong> {complaint.buyerId?.email || 'N/A'}</p>
                                        <p className="mb-1"><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
                                        <p className="mb-1"><strong>Description:</strong> {complaint.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Artisan Complaints Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Artisan Complaints</h2>
                        {artisanComplaints.length === 0 ? (
                            <p className="text-gray-600">No artisan complaints found.</p>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {artisanComplaints.map((complaint, index) => (
                                    <div
                                        key={index}
                                        className="card border p-4 rounded-lg shadow bg-white"
                                    >
                                        <p className="mb-1"><strong>Name:</strong> {complaint.artisanId?.firstname || 'N/A'}</p>
                                        <p className="mb-1"><strong>Email:</strong> {complaint.artisanId?.email || 'N/A'}</p>
                                        <p className="mb-1"><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
                                        <p className="mb-1"><strong>Description:</strong> {complaint.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>

            </div></div>
    );
}

export default AdminViewComplaints;
