import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavLanding from "../Landing/NavLanding";
import axiosInstance from "../../BaseApi/Baseurl";
import Footer from "../footer/Footer";

function DeliveryAgentRegistration() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    housename: "",
    email: "",
    city: "",
    pincode: "",
    contact: "",
    district: "",
    password: "",
    // confirmPassword: "",
    age: "",
    aadhar: "",
    licence: null,
    vehicleRegNumber: "",
    // image: null,
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;

    if (!formData.name.trim()) newErrors.name = "name is required";
    if (!formData.housename.trim())
      newErrors.housename = "House name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.aadhar.trim()) newErrors.aadhar = "Aadhar is required";
    if (!formData.licence) newErrors.licence = "License file is required";
    if (!formData.vehicleRegNumber.trim())
      newErrors.vehicleRegNumber = "Vehicle registration number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    // if (!formData.image) newErrors.image = 'Photo is required';

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters, include a special character, a number, and a capital letter";
    }

    // if (formData.confirmPassword !== formData.password) {
    //   newErrors.confirmPassword = 'Passwords do not match';
    // }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      try {
        const res = await axiosInstance.post("/registerdelivery", formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res, "rwe");

        if (res.data.status === 200) {
          alert("Registered successfully!");
          navigate("/deliveryagent/login");
        } else if (res.data.status === 400) {
          alert("email id or aadhar number is already exist");
        }
      } catch (err) {
        console.error(err);
        alert("Error during registration");
      }
    }
  };

  return (
    <>
      <NavLanding />
      <div className="min-h-screen bg-gray-100 flex justify-center py-2 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-md shadow-md max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <h4 className=" font-bold text-center col-span-2">
            Delivery Agent Registration
          </h4>

          {/* Input fields */}
          {[
            { label: "Name", name: "name" },
            { label: "House Name", name: "housename" },
            { label: "Email", name: "email", type: "email" },
            { label: "Contact", name: "contact", type: "tel" },
            { label: "City", name: "city" },
            { label: "District", name: "district" },
            { label: "Pincode", name: "pincode" },
            { label: "Age", name: "age" },
            { label: "Aadhar", name: "aadhar" },
            { label: "Vehicle Reg. Number", name: "vehicleRegNumber" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Photo Upload */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div> */}

          {/* Licence Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              License File
            </label>
            <input
              name="licence"
              type="file"
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors.licence && (
              <p className="text-red-500 text-sm">{errors.licence}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div> */}

          {/* Agree Checkbox */}
          <div className="md:col-span-2 flex items-center">
            <input
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I agree to the terms and conditions
            </label>
          </div>
          {errors.agree && (
            <p className="text-red-500 text-sm md:col-span-2">{errors.agree}</p>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 shadow"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default DeliveryAgentRegistration;
