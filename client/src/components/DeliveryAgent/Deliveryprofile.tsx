import React, { useEffect, useState } from 'react'
// import "./UserProfile.css"

import axiosInstance from '../../BaseApi/Baseurl'
import { toast } from "react-toastify";
import ArtisanNavbar from '../navigation/ArtisanNavbar';
import Footer from '../footer/Footer';
import DeliveryNavbar from '../navigation/DeliveryNavbar';

function Deliveryprofile({url}) {
    const userid=localStorage.getItem("deliveryagentid")
    console.log(userid);
 
    const[data,setData]=useState({})
    const [editMode, setEditMode] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        name:"",
        vehicleRegNumber:"",
        housename:"",
        email:"",
        city:"",
        pincode:"",
        contact:"",
        district:"",
        aadhar:"",
        licence:"",
        age:""
    });


    useEffect(()=>{
        axiosInstance.post(`viewdeliveryById/${userid}`)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const dateOfBirth = new Date(data.aadhar);

    const formattedDateOfBirth = `${dateOfBirth.getMonth() + 1}/${dateOfBirth.getDate()}/${dateOfBirth.getFullYear()}`;

    const ageInMilliseconds = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(ageInMilliseconds);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

const handleEdit = () => {
        // setEditedProfile(data);
        setEditedProfile({
            name: data.name,
            vehicleRegNumber: data.vehicleRegNumber,
            housename: data.housename,
            email: data.email,
            city: data.city,
            pincode: data.pincode,
            contact: data.contact,
            district: data.district,
            aadhar: data.aadhar,
            licence: data.licence ,
            age:data.age
        });
        setEditMode(true);
    };
    const handleChange = (e) => {
        if (e.target.type === 'file') {
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
    if (editedProfile.age.trim()) {
       toast.warning("Age is required");
   
  } else if (isNaN(editedProfile.age) || parseInt(editedProfile.age) < 18) {
     toast.warning("Age must be 18 or older");
    
  }
      const formData = new FormData();
      formData.append("name", editedProfile.name);
      formData.append("vehicleRegNumber", editedProfile.vehicleRegNumber);
      formData.append("housename", editedProfile.housename);
      formData.append("email", editedProfile.email);
      formData.append("city", editedProfile.city);
      formData.append("pincode", editedProfile.pincode);
      formData.append("contact", editedProfile.contact);
      formData.append("district", editedProfile.district);
      formData.append("password", ""); // If you're not editing password, leave it blank or remove it
      formData.append("age", editedProfile.age);
      formData.append("aadhar", editedProfile.aadhar);
    
      // Check and append file only if it's a new one
      if (editedProfile.licence && editedProfile.licence instanceof File) {
        formData.append("licence", editedProfile.licence); // licence matches your backend field name
      }
    
      axiosInstance.post(`editdeliveryById/${userid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res);
          toast.success("Updated Successfully");
          setEditMode(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Update Failed");
        });
    };
    
    return (
      <>
      <DeliveryNavbar/>
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Cover + Profile */}
            <div className="relative bg-indigo-600 h-32">
              <div className="absolute inset-x-0 top-5 flex flex-col items-center">
                <img
                  src={`${url}/${data?.licence?.filename}`}
                  alt="Profile"
                  className="h-28 w-60  border-4 border-white object-cover"
                />
                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  {data?.name}
                </h2>
                <p className="text-sm text-gray-500">Delivery Agent Profile</p>
              </div>
            </div>
      
            {/* Profile Content */}
            <div className="p-6 mt-24 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  {editMode ? (
                    <div className="flex">
                      <input type="text" name="name" value={editedProfile?.name} onChange={handleChange} className="form-input w-1/2" />
                      <input type="text" className="form-input w-1/2" />

                    </div>
                  ) : (
                    <p className="text-gray-900">{data?.name}</p>
                  )}
                </div>
      
                {/* aadhar + Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vehicle Registration Number</label>
                  {editMode ? (
                    <input type="number" name="vehicleRegNumber" value={editedProfile?.vehicleRegNumber} onChange={handleChange} className="form-input w-full" />
                  ) : (
                    <p className="text-gray-900">{data?.vehicleRegNumber}</p>
                  )}
                </div>
      
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {editMode ? (
                    <input type="email" name="email" value={editedProfile?.email} onChange={handleChange} className="form-input w-full" />
                  ) : (
                    <p className="text-gray-900">{data?.email}</p>
                  )}
                </div>
      
                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                  {editMode ? (
                    <input type="number" name="contact" value={editedProfile.contact} onChange={handleChange} className="form-input w-full" />
                  ) : (
                    <p className="text-gray-900">{data?.contact}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">aadhar</label>
                  {editMode ? (
                    <input type="number" name="aadhar" value={editedProfile?.aadhar} onChange={handleChange} className="form-input w-full" />
                  ) : (
                    <p className="text-gray-900">{data?.aadhar}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  {editMode ? (
                    <input type="number" name="age" value={editedProfile?.age} onChange={handleChange} className="form-input w-full" />
                  ) : (
                    <p className="text-gray-900">{data?.age}</p>
                  )}
                </div>
      
                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  {editMode ? (
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" name="housename" value={editedProfile?.housename} onChange={handleChange} className="form-input" placeholder="House Name" />
                      <input type="text" name="city" value={editedProfile?.city} onChange={handleChange} className="form-input" placeholder="City" />
                      <input type="text" name="district" value={editedProfile?.district} onChange={handleChange} className="form-input" placeholder="District" />
                      <input type="text" name="pincode" value={editedProfile?.pincode} onChange={handleChange} className="form-input" placeholder="Pincode" />
                    </div>
                  ) : (
                    <p className="text-gray-900">
                      {data?.housename}, {data?.city}, {data?.district} - {data?.pincode}
                    </p>
                  )}
                </div>
      
                {/* Profile licence Upload */}
                {editMode && (
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Update licence</label>
                    <input type="file" name="licence" onChange={handleChange} className="mt-1" />
                  </div>
                )}
              </div>
      
              {/* Buttons */}
              <div className="flex justify-end gap-4">
                {editMode ? (
                  <>
                    <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                    <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                  </>
                ) : (
                  <button onClick={handleEdit} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Edit Profile</button>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
        </>
      );
      
}

export default Deliveryprofile