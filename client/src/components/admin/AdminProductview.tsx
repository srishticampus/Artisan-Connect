import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axiosInstance from "../../BaseApi/baseurl";

const AdminProductview = ({ url }) => {
  const [artwork, setArtwork] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axiosInstance
      .post("/viewArtworks")
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setArtwork(response.data.data);
        } else {
          console.error("Unexpected response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching artwork:", error);
      });
  }, []);

  // Filter artworks by search term
  const filteredArtworks = artwork.filter((art) =>
    art.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col ml-64 p-8">
      <AdminSidebar />
      <h1 className="text-2xl font-bold mb-4">Product Overview</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Art Name..."
          className="w-full md:w-1/3 p-2 border rounded-lg shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product ID</th>
                  <th className="text-left py-3 px-4">Art</th>
                  <th className="text-left py-3 px-4">Art Name</th>
                  <th className="text-left py-3 px-4">Artist Name</th>
                  <th className="text-left py-3 px-4">Price</th>
                                    <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredArtworks.length > 0 ? (
                  filteredArtworks.map((art, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{art._id || `ART-${index + 1}`}</td>
                      <td className="py-3 px-4">
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={`${url}/${art.file?.filename}`}
                          alt="art"
                        />
                      </td>
                      <td className="py-3 px-4">{art.name || "N/A"}</td>
                      <td className="py-3 px-4">{art.artistId?.firstname || "N/A"}</td>
                      <td className="py-3 px-4">{art.price || "N/A"}</td>
                      <td className="py-3 px-4">{art.status || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No artwork found.
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

export default AdminProductview;
