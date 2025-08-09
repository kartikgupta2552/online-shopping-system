import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();

  // 💉 All state/actions come from CartContext, not weird local arrays anymore.
  const {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    clearCart,
    addToWishlist,
    removeFromWishlist,
  } = useContext(CartContext);

  // 💵 Calculate real total dynamically, not from fake demo data.
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // 🛒 Move item from cart to wishlist
  const moveToWishlist = (item) => {
    addToWishlist(item);
    // removeFromCart(item.id);
  };

  // 💖 Move item from wishlist to cart
  const moveToCart = (item) => {
    addToCart(item);
    // removeFromWishlist(item.id);
  };

  // ⚡ Buy now: navigate to payment if any items in cart, else give user the finger.
  const handleClickPayment = () => {
    if (cart.length > 0) {
      navigate("/payment");
    } else {
      alert("Cart is empty. Add something before checking out!");
    }
  };

  // --- RENDER ---
  return (
    <div className="container-fluid p-3">
      {/* Navbar */}
      <MyNavbar />

      {/* Cart Section */}
      <div className="mb-4">
        <h4 className="mb-3">🛒 Cart Items</h4>
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {cart.map((item) => (
            <div className="col" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image_path}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body p-2">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-text mb-1">
                    ₹{item.price} {item.quantity > 1 && <span>x {item.quantity}</span>}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => moveToWishlist(item)}
                    >
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="col">
              <div className="alert alert-info text-center">
                No items in cart. Time to go shopping!
              </div>
            </div>
          )}
        </div>
        {/* Total and Actions */}
        <div className="mt-4">
          <h5>Total Amount: ₹{totalAmount}</h5>
          <button className="btn btn-success me-2" onClick={handleClickPayment}>
            Buy Now
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="mb-4">
        <h4 className="mb-3">💖 Wishlist</h4>
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {wishlist.map((item) => (
            <div className="col" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body p-2">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-text mb-1">₹{item.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm w-100 mt-2 me-2"
                      onClick={() => moveToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-100 mt-2"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {wishlist.length === 0 && (
            <div className="col">
              <div className="alert alert-warning text-center">
                Your wishlist is empty.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
