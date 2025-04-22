import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../BaseApi/Baseurl';

function AdminViewArtistIndividual({ url }) {
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post(`viewArtistById/${id}`)
      .then((res) => setArtist(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  const deletefn = () => {
    axiosInstance.post(`deleteArtistById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          alert("Deleted Successfully");
          navigate(-1);
        }
      })
      .catch(() => alert("Can't Delete"));
  };

  const dateOfBirth = new Date(artist.dob);
  const formattedDateOfBirth = `${dateOfBirth.getMonth() + 1}/${dateOfBirth.getDate()}/${dateOfBirth.getFullYear()}`;
  const ageInMilliseconds = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageInMilliseconds);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/5 bg-white border-r">
        <AdminSidebar />
      </div>

      {/* Profile Content */}
      <div className="w-4/5 p-10">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8">Artist Profile</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Top section with image and name */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500">
              <img
                src={`${url}/${artist.image?.filename}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {artist?.firstname} {artist?.lastname}
              </h2>
              <p className="text-gray-500 text-sm">Artist</p>
            </div>
          </div>

          {/* Info Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p><span className="font-semibold">Name:</span> {artist?.firstname} {artist?.lastname}</p>
              <p><span className="font-semibold">DOB:</span> {formattedDateOfBirth}</p>
              <p><span className="font-semibold">Email:</span> {artist?.email}</p>
            </div>
            <div>
              <p><span className="font-semibold">Age:</span> {age}</p>
              <p><span className="font-semibold">Contact:</span> {artist?.contact}</p>
            </div>
            <div className="col-span-2">
              <p>
                <span className="font-semibold">Address:</span> {artist?.housename}, {artist?.city}, {artist?.district}, {artist?.pincode}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <div className="mt-8 text-center">
            <button
              onClick={deletefn}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Remove Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewArtistIndividual;
