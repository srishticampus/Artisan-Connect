// BuyerProfile.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../BaseApi/Baseurl.js";
import { toast } from "react-toastify";
import Navbar from "../navigation/Navbar";
import "./BuyerProfile.css";
import Footer from "../footer/Footer";

function BuyerProfile({ url }) {
  const userid = localStorage.getItem("buyerid");
  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstname: "",
    lastname: "",
    housename: "",
    email: "",
    city: "",
    pincode: "",
    contact: "",
    district: "",
    dob: "",
    image: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`viewUserById/${userid}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dateOfBirth = new Date(data.dob);
  const formattedDateOfBirth = `${dateOfBirth.getMonth() + 1}/${dateOfBirth.getDate()}/${dateOfBirth.getFullYear()}`;
  const ageInMilliseconds = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageInMilliseconds);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  const handleEdit = () => {
    setEditedProfile({
      firstname: data.firstname,
      lastname: data.lastname,
      housename: data.housename,
      email: data.email,
      city: data.city,
      pincode: data.pincode,
      contact: data.contact,
      district: data.district,
      dob: data.dob,
      image: data.image,
    });
    setEditMode(true);
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setEditedProfile({ ...editedProfile, [e.target.name]: file });
    } else {
      setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (editedProfile.contact.toString().length !== 10) {
      toast.warning("Contact number must be a 10-digit number");
      return;
    }
    if (editedProfile.pincode.toString().length !== 6) {
      toast.warning("Pincode number must be a 6-digit number");
      return;
    }

    axiosInstance
      .post(`editUserById/${userid}`, editedProfile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Updated Successfully");
        setData(editedProfile);
        setEditMode(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="relative bg-indigo-600 h-36 sm:h-44">
            <div className="absolute inset-x-0 top-20 sm:top-24 flex flex-col items-center">
              <img
                src={`${url}/${data.image?.filename}`}
                alt="Profile"
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white object-cover shadow-md"
              />
              <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-gray-800">
                {data.firstname} {data.lastname}
              </h2>
              <p className="text-sm text-gray-500">Buyer Profile</p>
            </div>
          </div>

          <div className="p-8 mt-24 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                {editMode ? (
                  <div className="flex gap-2">
                    <input type="text" name="firstname" value={editedProfile.firstname} onChange={handleChange} className="form-input w-1/2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" />
                    <input type="text" name="lastname" value={editedProfile.lastname} onChange={handleChange} className="form-input w-1/2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" />
                  </div>
                ) : (
                  <p className="text-gray-900">{data.firstname} {data.lastname}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                {editMode ? (
                  <input type="date" name="dob" value={editedProfile.dob} onChange={handleChange} className="form-input w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" />
                ) : (
                  <p className="text-gray-900">{formattedDateOfBirth} ({age} years)</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                {editMode ? (
                  <input type="email" name="email" value={editedProfile.email} onChange={handleChange} className="form-input w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" />
                ) : (
                  <p className="text-gray-900">{data.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                {editMode ? (
                  <input type="number" name="contact" value={editedProfile.contact} onChange={handleChange} className="form-input w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" />
                ) : (
                  <p className="text-gray-900">{data.contact}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                {editMode ? (
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="housename" value={editedProfile.housename} onChange={handleChange} className="form-input rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" placeholder="House Name" />
                    <input type="text" name="city" value={editedProfile.city} onChange={handleChange} className="form-input rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" placeholder="City" />
                    <input type="text" name="district" value={editedProfile.district} onChange={handleChange} className="form-input rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" placeholder="District" />
                    <input type="text" name="pincode" value={editedProfile.pincode} onChange={handleChange} className="form-input rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm" placeholder="Pincode" />
                  </div>
                ) : (
                  <p className="text-gray-900">{data.housename}, {data.city}, {data.district} - {data.pincode}</p>
                )}
              </div>

              {editMode && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Update Profile Image</label>
                  <input type="file" name="image" onChange={handleChange} className="mt-1" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              {editMode ? (
                <>
                  <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">Save</button>
                  <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200">Cancel</button>
                </>
              ) : (
                <button onClick={handleEdit} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200">Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default BuyerProfile;