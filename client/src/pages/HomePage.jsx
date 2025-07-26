import React from "react";
import MyNavbar from "../components/MyNavbar.jsx";
import Product from "../components/Product.jsx";
import Footer from "../components/Footer.jsx";
import categories from "../Dummy Data/Categories.js";

import products from "../Dummy Data/products.js";
import { useLocation, useNavigate, Link } from "react-router-dom";

function HomePage() {
  // Pick your sausage: all or some categories
  const selectedCategories = categories.slice(0, 3);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <MyNavbar />
      {location.state && location.state.loginSuccess && (
        <div className="alert alert-success text-center" role="alert">
          Logged in successfully!
        </div>
      )}
      <div className="container">
        {selectedCategories.map((cat) => (
          <div key={cat.id}>
            <h2>{cat.name}</h2>
            <div className="row">
              {products
                .filter((p) => p.category === cat.name)
                .map((p) => (
                  <div className="col-md-3" key={p.id}>
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
