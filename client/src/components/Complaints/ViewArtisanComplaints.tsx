import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseApi/baseurl';
import ArtisanNavbar from '../navigation/ArtisanNavbar';
import Footer from '../footer/Footer';

function ViewArtisanComplaints() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const artisanId = localStorage.getItem("artisanid")

        axiosInstance
            .get(`/artisan/view/${artisanId}`)
            .then((res) => setComplaints(res.data.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <ArtisanNavbar />
            <div style={{minHeight:"80vh"}} className="container mx-auto mt-5 p-4 border rounded shadow bg-white">
                <h2 className="text-xl font-bold mb-4">Your Complaints</h2>
                {complaints.length === 0 ? (
                    <p>No complaints found.</p>
                ) : (
                    <ul className="list-group">
                        {complaints.map((item, index) => (
                            <li key={index} className="list-group-item mb-2">
                                <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}<br />
                                <strong>Description:</strong> {item.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div><Footer/></div>
    );
}

export default ViewArtisanComplaints;
