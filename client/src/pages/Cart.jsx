import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import {useNavigate} from 'react-router-dom'
import headphoneImg from '../assets/headphones.jpg';
const sampleItem = {
  id: 0,
  title: 'Sample Item',
  price: 100,
  image:headphoneImg
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { ...sampleItem, id: 1 },
    { ...sampleItem, id: 2 },
    { ...sampleItem, id: 3 }
  ]);

  const [wishlist, setWishlist] = useState([
    { ...sampleItem, id: 4 },
    { ...sampleItem, id: 5 },
    { ...sampleItem, id: 6 }
  ]);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  const navigate=useNavigate();
  function handleClickPayment(){
    navigate('/payment')
  }

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setWishlist(wishlist.filter(w => w.id !== item.id));
  };

  const moveToWishlist = (item) => {
    setWishlist([...wishlist, item]);
    setCartItems(cartItems.filter(c => c.id !== item.id));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container-fluid p-3">
      {/* Navbar */}
      <Navbar/>

      {/* Cart Section */}
      <div className="mb-4">
        <h4 className="mb-3">🛒 Cart Items</h4>
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {cartItems.map(item => (
            <div className="col" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body p-2">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-text mb-1">₹{item.price}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => moveToWishlist(item)}>Wishlist</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total and Actions */}
        <div className="mt-4">
          <h5>Total Amount: ₹{totalAmount}</h5>
          <button className="btn btn-success me-2"onClick={handleClickPayment} >Buy Now</button>
          <button className="btn btn-outline-danger" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="mb-4">
        <h4 className="mb-3">💖 Wishlist</h4>
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {wishlist.map(item => (
            <div className="col" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body p-2">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-text mb-1">₹{item.price}</p>
                  <button className="btn btn-primary btn-sm w-100" onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default Cart;
