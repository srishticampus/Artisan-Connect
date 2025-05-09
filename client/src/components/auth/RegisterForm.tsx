import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import NavLanding from '../Landing/NavLanding';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../BaseApi/Baseurl"
import Footer from '../footer/Footer';
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    housename: '',
    address: '',
    email: '',
    city: '',
    pincode: '',
    contact: '',
    district: '',
    dob: '',
    password: '',
    confirmPassword: '',
    image: null,
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const keralaDistricts = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
    "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad",
    "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;

    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.housename.trim()) newErrors.housename = 'House name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.image) newErrors.image = 'Photo is required';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 6 characters, include a special character, a number, and a capital letter';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      try {
        const res = await axiosInstance.post(
          "/registerUser",
          formPayload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.status === 200) {
          alert("Registered successfully!");
          navigate("/buyer/login")
        } else {
          alert(res.data.msg || "Something went wrong");
        }
      } catch (err) {
        console.error(err);
        alert("Error during registration");
      }
    }
  };
  useEffect(()=>{
 console.log("ff",axiosInstance);
 
  },[])

  return (
    <>
      <NavLanding />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">Create your account</h2>

          <form onSubmit={handleSubmit} noValidate className="bg-white p-4 rounded-lg shadow-md grid md:grid-cols-2 gap-6">
            
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input name="firstname" type="text" value={formData.firstname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input name="lastname" type="text" value={formData.lastname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>

            {/* House Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">House Name</label>
              <input name="housename" type="text" value={formData.housename} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.housename && <p className="text-red-500 text-sm">{errors.housename}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea name="address" rows={2} value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <input name="contact" type="tel" value={formData.contact} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input name="city" type="text" value={formData.city} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            {/* District */}
        {/* District Dropdown */}
<div>
  <label className="block text-sm font-medium text-gray-700">District</label>
  <select
    name="district"
    value={formData.district}
    onChange={handleChange}
    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
  >
    <option value="">Select District</option>
    {keralaDistricts.map((district) => (
      <option key={district} value={district}>{district}</option>
    ))}
  </select>
  {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
</div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input name="pincode" type="text" value={formData.pincode} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
            </div>

            {/* Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input name="image" type="file" accept="image/*" onChange={handleChange} className="mt-1 block w-full text-sm" />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md pr-10 shadow-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 flex items-center text-gray-500">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            {/* Agree */}
            <div className="md:col-span-2 flex items-center">
              <input name="agree" type="checkbox" checked={formData.agree} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-900">I agree to the terms and conditions</label>
            </div>
            {errors.agree && <p className="text-red-500 text-sm md:col-span-2">{errors.agree}</p>}

            {/* Submit */}
            <div className="md:col-span-2">
              <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 shadow">
                Register
              </button>
            </div>

            {/* Login Link */}
            <div className="md:col-span-2 text-center text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 hover:underline">
                Login Now
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default RegisterForm;
