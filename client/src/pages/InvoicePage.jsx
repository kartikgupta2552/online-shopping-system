import React from 'react';
import MyNavbar from './../components/MyNavbar';
import HeadPhoneImg from './../assets/headphones.jpg'
import {useNavigate} from 'react-router-dom'

const InvoicePage = () => {

    const navigate=useNavigate();
    function handleClickPayment(){
        navigate('/payment')
      }

  const cartItems = [
    {
      id: 1,
      title: 'Headphone Samsung',
      image: HeadPhoneImg,
      quantity: 2,
      price: 1000,
      details:"Built-in DAC for customized for undistorted, studio quality audio experience. Rich AKG tuned audio designed with 2-way speakers, so you get pro-grade sound quality. Crafted with lightweight materials, & designed to sit comfortably in your ears so you can tune out the world with your music."
    },
    {
      id: 2,
      title: 'Umbrella',
      image: HeadPhoneImg,
      quantity: 4,
      price: 250,
      details:"Built-in DAC for customized for undistorted, studio quality audio experience. Rich AKG tuned audio designed with 2-way speakers, so you get pro-grade sound quality. Crafted with lightweight materials, & designed to sit comfortably in your ears so you can tune out the world with your music."
    },
    {
        id: 3,
        title: 'Umbrella',
        image: HeadPhoneImg,
        details:"Built-in DAC for customized for undistorted, studio quality audio experience. Rich AKG tuned audio designed with 2-way speakers, so you get pro-grade sound quality. Crafted with lightweight materials, & designed to sit comfortably in your ears so you can tune out the world with your music.",
        quantity: 4,
        price: 150,
      },
  ];

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

 

  return (
    <div className="container-fluid my-4">
      {/* Navbar */}
     
      <MyNavbar/>

      {/* Invoice Section */}
      <h1 className="mb-4 text-center">🧾 Invoice</h1><br/>
    


    <div className="row g-3">
        {cartItems.map((item) => (
            <div className="row mb-4">
            <div className="col-md-5">
              <img src={item.image}alt="Product" className="img-fluid rounded shadow"  
              style={{ width: '80%', height: '90%', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-7">
              
              <h4 className="mb-1 mt-2"><strong>Name : </strong>{item.title}</h4>
              <h5 className="mb-1 text-secondary" ><strong className='text-dark'>Details : </strong> {item.details}   </h5>
              <h5 className="mb-1"><strong>Quantity : </strong> {item.quantity}</h5>
            <h5 className="mb-1"><strong>Price : </strong> ₹{item.price}</h5>
            <h5 className="mb-0 fw-bold ">Amt : ₹{item.price * item.quantity}/- only</h5>
                 
            </div>
          </div>
  
        ))}
      </div>





    










      {/* Address & Total */}
      <div className="mt-4">
        <label htmlFor="addressSelect" className="form-label">Select Address</label>
        <select id="addressSelect" className="form-select mb-3">
          <option>Home Address</option>
          <option>Office Address</option>
          <option>Other</option>
        </select>

        <h5 className="mb-3" style={{ color: 'red' }}>Total Amount: ₹{totalAmount}/- only</h5>

        <button className="btn btn-primary btn-lg"   onClick={handleClickPayment} >
          Payment
        </button>
      </div>

      
    </div>
  );
};

export default InvoicePage;
