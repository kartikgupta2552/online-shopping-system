
import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import BASE_URL from "../api/apiConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    address: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!formData.userName.trim()) tempErrors.userName = "Name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email";

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      tempErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    if (!formData.mobileNo.trim())
      tempErrors.mobileNo = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNo))
      tempErrors.mobileNo = "Enter 10-digit mobile number";

    if (!formData.address.trim())
      tempErrors.address = "Address is required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    const { confirmPassword, ...dataToSend } = formData;

    // ✅ Log to confirm data structure
    console.log("Sending to backend:", dataToSend);

    axios.post(`${BASE_URL}/api/users/register`, dataToSend, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      alert("Registered successfully ✅");
      // optionally navigate
    })
    .catch((error) => {
      console.error("Registration failed:", error.response?.data || error);
      alert("Registration failed ❌");
    });
  };

  return (
    <div className="container bg-secondary vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 col-lg-5 mx-auto">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              {/* userName */}
              <div className="mb-3">
                <label htmlFor="userName">Name</label>
                <input type="text" id="userName" className="form-control" value={formData.userName} onChange={handleChange} />
                {errors.userName && <small className="text-danger">{errors.userName}</small>}
              </div>

              {/* email */}
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" className="form-control" value={formData.email} onChange={handleChange} />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              {/* password */}
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              {/* confirmPassword */}
              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
              </div>

              {/* mobileNo */}
              <div className="mb-3">
                <label htmlFor="mobileNo">Mobile No</label>
                <input type="text" id="mobileNo" className="form-control" value={formData.mobileNo} onChange={handleChange} />
                {errors.mobileNo && <small className="text-danger">{errors.mobileNo}</small>}
              </div>

              {/* address */}
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" className="form-control" value={formData.address} onChange={handleChange} />
                {errors.address && <small className="text-danger">{errors.address}</small>}
              </div>

              <div className="d-flex justify-content-center">
                <button className="btn btn-primary w-75">Sign up</button>
              </div>
            </form>

            <p className="text-center mt-3">
              Already have an account? <Link to="/" className="btn btn-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

