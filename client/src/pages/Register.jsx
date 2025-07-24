import React, { useState } from "react";
import App from "../App";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
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

    if (!formData.name.trim()) tempErrors.name = "Name is required";

    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email";

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword)
      tempErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    if (!formData.mobile.trim())
      tempErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      tempErrors.mobile = "Enter 10-digit mobile number";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    }
    else{
      setErrors({})
      alert("Registered successfully ✅");
      // Now you can send data to server or navigate to login
    }
  };

  return (
    <div className="container bg-secondary vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6  col-lg-5 mx-auto">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="confirm-password">Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="number"
                  id="mobile"
                  className="form-control"
                  placeholder="Enter Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && (
                  <small className="text-danger">{errors.mobile}</small>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary w-75">Sign up</button>
              </div>
            </form>
            <p className="text-center">
              Already have an account?
              <Link to="/" className="btn btn-link">
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
