import React, { useState } from "react";
import userApi from "../api/userApi";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";


const Register = () => {
  // --- Form State, one true validation home ---
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  // --- Handle all field changes ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors((old) => ({ ...old, [e.target.id]: undefined }));
    setServerError("");
  };

  // --- Local validation before hitting the server ---
  const validate = (fields) => {
    const tempErrors = {};

    if (!fields.userName.trim()) tempErrors.userName = "Name is required";

    if (!fields.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(fields.email))
      tempErrors.email = "Invalid email address";

    if (!fields.password) tempErrors.password = "Password is required";
    else if (fields.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    if (!fields.confirmPassword)
      tempErrors.confirmPassword = "Confirm your password";
    else if (fields.password !== fields.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    if (!fields.mobileNo.trim()) tempErrors.mobileNo = "Mobile number is required";
    else if (!/^\d{10}$/.test(fields.mobileNo))
      tempErrors.mobileNo = "Enter 10-digit mobile number";

    if (!formData.address.trim()) tempErrors.address = "Address is required";

    return tempErrors;
  };

  // --- On form submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate(formData);
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      // Prepare backend payload; adapt to expected backend keys
      // (Assuming backend wants: userName, email, password, mobileNo)
      const payload = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        mobileNo: formData.mobileNo,
        address: formData.address,
      };

      await userApi.registerUser(payload);

      // Registration success, redirect to login
      setLoading(false);
      alert("Registered successfully ✅. Please login.");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      //axios error handling
      if(err.response && err.response.data && err.response.data.message){
        setServerError(err.response.data.message);
      }
      else if(err.response && err.response.data && err.response.data.data){
        setErrors(err.response.data.data)
      }
      else {
        setServerError("Registration failed. Please check your details and try again.")
      }
    }
  };

  return (
    <div className="container bg-secondary vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 col-lg-5 mx-auto">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Register</h3>
            {serverError && (
              <div className="alert alert-danger text-center">
                {serverError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {/* userName */}
              <div className="mb-3">
                <label htmlFor="userName">Name</label>
                <input
                  type="text"
                  id="userName"
                  className={
                    "form-control" + (errors.userName ? " is-invalid" : "")
                  }
                  placeholder="Enter name"
                  value={formData.userName}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.userName && (
                  <small className="text-danger">{errors.userName}</small>
                )}
              </div>

              {/* email */}
              <div className="mb-3">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  id="email"
                  className={
                    "form-control" + (errors.email ? " is-invalid" : "")
                  }
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* password */}
              <div className="mb-3">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  id="password"
                  className={
                    "form-control" + (errors.password ? " is-invalid" : "")
                  }
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>

              {/* confirmPassword */}
              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={
                    "form-control" +
                    (errors.confirmPassword ? " is-invalid" : "")
                  }
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>

              {/* mobileNo */}
              <div className="mb-3">
                <label htmlFor="mobileNo">Mobile</label>
                <input
                  type="tel"
                  maxLength="10"
                  id="mobileNo"
                  className={
                    "form-control" + (errors.mobileNo ? " is-invalid" : "")
                  }
                  placeholder="Enter Mobile"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.mobileNo && (
                  <small className="text-danger">{errors.mobileNo}</small>
                )}
              </div>

              {/* address */}
              <div className="mb-4">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <small className="text-danger">{errors.address}</small>
                )}
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary w-75"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Registering..." : "Sign up"}
                </button>
              </div>
            </form>

            <p className="text-center mt-2">
              Already have an account?
              <Link to="/login" className="btn btn-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
