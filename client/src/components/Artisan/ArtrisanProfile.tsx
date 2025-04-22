import React, { useEffect, useState } from "react";
// import "./UserProfile.css"

import axiosInstance from "../../BaseApi/Baseurl";
import { toast } from "react-toastify";
import ArtisanNavbar from "../navigation/ArtisanNavbar";
import Footer from "../footer/Footer";

function ArtrisanProfile({ url }) {
  const userid = localStorage.getItem("artisanid");
  console.log(userid);

  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstname: "",
    lastname: "",
    image: "",
    housename: "",
    email: "",
    city: "",
    pincode: "",
    contact: "",
    district: "",
    password: "",
    dob: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`viewUserById/${userid}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dateOfBirth = new Date(data.dob);

  const formattedDateOfBirth = `${
    dateOfBirth.getMonth() + 1
  }/${dateOfBirth.getDate()}/${dateOfBirth.getFullYear()}`;

  const ageInMilliseconds = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageInMilliseconds);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  const handleEdit = () => {
    // setEditedProfile(data);
    setEditedProfile({
      firstname: data.firstname,
      lastname: data.lastname,
      image: data.image,
      housename: data.housename,
      email: data.email,
      city: data.city,
      pincode: data.pincode,
      contact: data.contact,
      district: data.district,
      dob: data.dob,
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
  console.log(editedProfile);

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
        console.log(res);
        toast.success("Updated Succesfully");
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
      <ArtisanNavbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Cover + Profile */}
          <div className="relative bg-indigo-600 h-32">
            <div className="absolute inset-x-0 top-16 flex flex-col items-center">
              <img
                src={`${url}/${data.image?.filename}`}
                alt="Profile"
                className="h-28 w-28 rounded-full border-4 border-white object-cover"
              />
              <h2 className="mt-2 text-xl font-bold text-gray-800">
                {data.firstname} {data.lastname}
              </h2>
              <p className="text-sm text-gray-500">Buyer Profile</p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 mt-24 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                {editMode ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="firstname"
                      value={editedProfile.firstname}
                      onChange={handleChange}
                      className="form-input w-1/2"
                    />
                    <input
                      type="text"
                      name="lastname"
                      value={editedProfile.lastname}
                      onChange={handleChange}
                      className="form-input w-1/2"
                    />
                  </div>
                ) : (
                  <p className="text-gray-900">
                    {data.firstname} {data.lastname}
                  </p>
                )}
              </div>

              {/* DOB + Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                {editMode ? (
                  <input
                    type="date"
                    name="dob"
                    value={editedProfile.dob}
                    onChange={handleChange}
                    className="form-input w-full"
                  />
                ) : (
                  <p className="text-gray-900">
                    {formattedDateOfBirth} ({age} years)
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                    className="form-input w-full"
                  />
                ) : (
                  <p className="text-gray-900">{data.email}</p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                {editMode ? (
                  <input
                    type="number"
                    name="contact"
                    value={editedProfile.contact}
                    onChange={handleChange}
                    className="form-input w-full"
                  />
                ) : (
                  <p className="text-gray-900">{data.contact}</p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                {editMode ? (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="housename"
                      value={editedProfile.housename}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="House Name"
                    />
                    <input
                      type="text"
                      name="city"
                      value={editedProfile.city}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      name="district"
                      value={editedProfile.district}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="District"
                    />
                    <input
                      type="text"
                      name="pincode"
                      value={editedProfile.pincode}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Pincode"
                    />
                  </div>
                ) : (
                  <p className="text-gray-900">
                    {data.housename}, {data.city}, {data.district} -{" "}
                    {data.pincode}
                  </p>
                )}
              </div>

              {/* Profile Image Upload */}
              {editMode && (
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Update Profile Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ArtrisanProfile;
