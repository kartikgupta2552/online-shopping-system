import React, { useEffect, useState } from "react";
import MyNavbar from "../components/MyNavbar.jsx";
import Product from "../components/Product.jsx";
import Footer from "../components/Footer.jsx";
import categories from "../Dummy Data/categories.js";
import products from "../Dummy Data/products.js";
import { useLocation, useNavigate } from "react-router-dom";

function HomePage() {
  const selectedCategories = categories.slice(0, 3);
  const location = useLocation();
  const navigate = useNavigate();

  // 🩸 Add state for temp login-success alert
  const [showLoginSuccess, setShowLoginSuccess] = useState(
    location.state?.loginSuccess || false
  );

  // 🩸 Unauthorized access alert (stays, auto-dismissed elsewhere)
  useEffect(() => {
    if (location.state && location.state.unauthorized) {
      const timeout = setTimeout(() => {
        navigate("/homepage", { replace: true, state: {} });
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [location, navigate]);

  // 🩸 TEMPORARY login success alert, auto-close after 2.5s
  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowLoginSuccess(true);

      const timeout = setTimeout(() => {
        setShowLoginSuccess(false);
        // Scrap loginSuccess from browser history so it's one-time only
        navigate(location.pathname, {
          replace: true,
          state: { ...location.state, loginSuccess: false }
        });
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [location.state?.loginSuccess, navigate, location.pathname]);

  return (
    <>
      <MyNavbar />
      {/* 🩸 Use local alert state here */}
      {showLoginSuccess && (
        <div className="alert alert-success text-center" role="alert">
          Logged in successfully!
        </div>
      )}
      {location.state && location.state.unauthorized && (
        <div>
          <b>Access Denied</b> Only <u>Admin</u> allowed.
        </div>
      )}
      <div className="container">
        {selectedCategories.map((cat) => (
          <div key={cat.id} className="mb-5 mt-4">
            <h2 className="mb-4">{cat.name}</h2>
            <div className="row d-flex align-items-stretch g-4">
              {products
                .filter((p) => p.category === cat.name)
                .map((p) => (
                  <div className="col-md-3 d-flex" key={p.id}>
                    <Product
                      id={p.id}
                      title={p.title}
                      description={p.description}
                      image={p.image}
                      price={p.price}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
