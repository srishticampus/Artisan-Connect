import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../BaseApi/Baseurl';

function AdminViewUserIndividual({ url }) {
  const { id } = useParams();
  const [delivery, setDelivery] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post(`viewUserById/${id}`)
      .then((res) => {
        setDelivery(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const dateOfBirth = new Date(delivery.dob);
  const formattedDateOfBirth = `${dateOfBirth.getMonth() + 1}/${dateOfBirth.getDate()}/${dateOfBirth.getFullYear()}`;
  const ageInMilliseconds = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageInMilliseconds);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  const deletefn = () => {
    axiosInstance
      .post(`deleteUserById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          alert('Deleted Successfully');
          navigate(-1);
        }
      })
      .catch(() => {
        alert("Can't Delete");
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">User Profile</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image and Name */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <img
                src={`${url}/${delivery.image?.filename}`}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover shadow mb-4 border"
              />
              <div className="text-xl font-semibold text-gray-800">
                {delivery?.firstname} {delivery?.lastname}
              </div>
              <div className="text-gray-500 text-sm mt-1">User</div>
            </div>

            {/* Profile Info */}
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span> {delivery?.firstname} {delivery?.lastname}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">DOB:</span> {formattedDateOfBirth}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {delivery?.email}@gmail.com
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Age:</span> {age}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Contact:</span> {delivery?.contact}
                </p>
                <p className="text-gray-700 col-span-1 md:col-span-2">
                  <span className="font-semibold">Address:</span> {delivery?.housename}, {delivery?.city}, {delivery?.district}, {delivery?.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Remove Button */}
          <div className="mt-8 text-center">
            <button
              onClick={deletefn}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded shadow"
            >
              Remove Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewUserIndividual;
