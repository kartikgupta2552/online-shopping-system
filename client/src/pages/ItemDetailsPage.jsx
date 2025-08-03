import React from 'react';
import {useNavigate} from 'react-router-dom'
import headphoneImg from '../assets/headphones.jpg';
import Navbar from '../components/Navbar';
import MyNavbar from '../components/MyNavbar';
const ItemDetailsPage = () => {

  const navigate=useNavigate();
  function handleClick(){
    navigate('/cart')
  }
  function handleClickWishList(){
    navigate('/cart')
  }
  function handleClickPayment(){
    navigate('/payment')
  }
    
  return (
    <>
      {/* Navbar */}
     
     
      <MyNavbar/>

      {/* Product Details */}
      <div className="container-fluid mb-5">
        <div className="row mb-4">
          <div className="col-md-5">
            <img src={headphoneImg}alt="Product" className="img-fluid rounded shadow"  />
          </div>
          <div className="col-md-7">
            <h3>Electronic Item</h3>
            <p><strong>Name:</strong> Bluetooth Headphones</p>
            <p><strong>Details:</strong> Wireless, noise cancelling, 30hr battery life<br/>
            Wireless, noise cancelling, 30hr battery life<br/>
            Wireless, noise cancelling, 30hr battery life
            </p>
            <h4 className="text-success">Price: ₹2000</h4>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <button className="btn btn-success" onClick={handleClick} >Add to Cart</button>
            
              <button className="btn btn-primary"  onClick={handleClickPayment} >Buy Now</button>
              <button className="btn btn-outline-danger" onClick={handleClickWishList} >Add to Wishlist</button>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <h5 className="mb-3">Related Items</h5>
        <div className="row flex-nowrap overflow-auto">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="col-6 col-md-2 mb-2" key={item}>
              <div className="card">
                <img src={headphoneImg} className="card-img-top" alt={`Item ${item}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center text-muted py-3 border-top">
        <div className="container">
          <a href="#" className="text-muted me-3">About Us</a>
          <a href="#" className="text-muted">Contact Us</a>
        </div>
      </footer>
    </>
  );
};

export default ItemDetailsPage;
