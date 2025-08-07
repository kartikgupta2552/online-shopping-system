import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function isLoggedIn() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token;
  } catch {
    return false;
  }
}

function Product({ id, title, description, image, price, ...rest }) {
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useContext(CartContext);

  // Compose the actual product object (since this is the one true thing we need to pass)
  const productObj = { id, title, description, image, price, ...rest };

  function handleBuyNow(e) {
    e.preventDefault();
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    addToCart(productObj); // Now truly adds the full product!
    navigate("/payment");
  }

  function handleAddToCart(e) {
    e.preventDefault();
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    addToCart(productObj);
  }

  function handleWishlistClick(e) {
    e.preventDefault();
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    addToWishlist(productObj);
  }

  return (
    <div className="card m-1 mb-2 border border-black product-card h-100">
      <img
        src={image}
        className="card-img-top product-card-img"
        alt={title}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column h-100">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">₹{price}</h6>
        <p
          className="card-text flex-grow-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <a
            href="#"
            className="btn btn-primary btn-sm mx-1"
            style={{ minWidth: "90px" }}
            onClick={handleBuyNow}
          >
            Buy Now
          </a>
          <a
            href="#"
            className="btn btn-primary btn-sm mx-1"
            style={{ minWidth: "90px" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </a>
          <button
            className="btn btn-outline-danger btn-sm mx-1 px-2 py-1"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "32px",
              lineHeight: "1",
            }}
            onClick={handleWishlistClick}
            title="Add to Wishlist"
          >
            <i className="bi bi-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
