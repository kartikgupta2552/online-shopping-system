import React, { useState } from "react";
import axios from 'axios';
import BASE_URL from "../api/apiConfig";
import { Link,useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/users/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
      const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    // Validate email
    if (!email.trim()) validationErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    // Validate password
    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return ;
    }

    //backend login authentication
    try {
      const response = await fetch (API_URL, {  //fetch sends credentials to the backend api
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({email,password}),  
      });

      if(!response.ok){
        //login failed
        setErrors({general: "Invalid email or password"});
        return;
      }

      const result = await response.json();
      const backendUser = result.data;
      //if something other than token/data comes from backend
      if(!backendUser || !backendUser.token || !backendUser.userRole){
        setErrors({general: "Invalid response from the server. Please try again after sometime."});
        return;
      }


      //get JWT and userinfo from the response send via backend
      localStorage.setItem("token",backendUser.token); //save token in local storage
      localStorage.setItem("user",JSON.stringify({
        userId:backendUser.userId,
        email: backendUser.email,
        userName: backendUser.userName,
        userRole: backendUser.userRole,
        userStatus: backendUser.userStatus,
        token: backendUser.token
      }));//save user
      
      //redirect to homepage after login
      navigate("/",{state: {loginSuccess: true} });

    } catch (error) {
      setErrors({general : "Login failed, please try again."});

    }
  };

  return (
    <div className="container bg-secondary vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4  mx-auto">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>
            {errors.general && (
              <div className="alert alert-danger text-center" >{errors.general}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary w-75">
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-center mt-2">
              Don't have account?
              <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
