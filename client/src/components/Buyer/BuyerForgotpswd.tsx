import React, { useState } from "react";
import axiosInstance from "../../BaseApi/Baseurl";
import { Link, useNavigate } from "react-router-dom";
import NavLanding from "../Landing/NavLanding";
import Footer from "../footer/Footer";

function BuyerForgotpswd() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const changefn = (e) => {
    const { name, value } = e.target;
    setData((preData) => ({ ...preData, [name]: value }));
    setErrors((preErrors) => ({ ...preErrors, [name]: "" }));
  };

  const formHandeling = (fieldName, value) => {
    if (!value.trim()) return `${fieldName} is required`;
    if (fieldName === "Password" && value.length < 8)
      return "Password must be at least 8 characters long";
    return "";
  };

  const navigate=useNavigate()

  const submitfn = (e) => {
    e.preventDefault();
    const errors = {
      email: formHandeling("Email", data.email),
      password: formHandeling("Password", data.password),
    };
    setErrors(errors);

    if (!errors.email && !errors.password) {
      axiosInstance
        .post("forgotPwdUser", data)
        .then((res) => {
          if (res.data.status === 200) {
            alert("Password Updated Successfully");
            navigate("/buyer/login")

          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <NavLanding />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="container p-6 rounded shadow bg-white" style={{ maxWidth: "800px" }}>
          <div className="row">
            <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
            <h3 className="mb-3 text-indigo-600  text-center">Reset Password</h3>
            </div>
            <div className="col-md-6">
            
              <form onSubmit={submitfn}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={changefn}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={data.password}
                    onChange={changefn}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-100"
                >
                  Update Password
                </button>
              </form>
              <p className="mt-3 text-center">
                Don’t have an account?{" "}
                <Link to="/buyer/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default BuyerForgotpswd;
