import React, { useState } from "react";
import MyNavbar from "../components/MyNavbar";
import {useNavigate} from 'react-router-dom'
import Footer from "../components/Footer";
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile saved!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const navigate=useNavigate();
  const handleCart = () => {
    navigate('/cart')
  };
  const handleInvoice = () => {
    navigate('/invoicePage')
  };
  const handleOrder = () => {
    navigate('/orderHistory')
  };

  return (
    <div>
     

      {/* Navbar */}
     <MyNavbar/>

     
        <div className="container mt-4 d-flex align-items-center justify-content-center mb-5">
        
        <div className="row w-50 ">
        <h3 className="text-center"> Edit Profile </h3>
       
        <div className="card p-3">
          {["name", "mobile", "email", "address"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label text-capitalize">{field}</label>
             
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                />
            </div>
          ))}

          {!isEditing ? (
            <button
              className="btn btn-danger"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
     
        </div>
        {/* Links */}
        {/* <div className="mt-4">
          <a href="#" className="d-block mb-2">Payment Options</a>
          <a href="#" className="d-block mb-2">Wishlist</a>
          <a href="#" className="d-block mb-2">Your Orders</a>
        </div> */}
         <div className="mt-3">
              <button className="btn btn-info me-2" onClick={handleInvoice}>
              Invoice
              </button>
              <button className="btn btn-dark me-2" onClick={handleCart}>
              Show Cart
              </button>
              <button className="btn btn-warning" onClick={handleOrder}>
              Your Orders
              </button>
            </div>
        </div>

       

       
      </div>

            
      <Footer/>
     
    </div>
  );
}
