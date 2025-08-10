// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import Product from "../components/Product";
import Footer from "../components/Footer";
import productApi from "../api/productApi";

function CategoryPage() {
  const { categoryName } = useParams(); // get "Fashion & Apparel" or whatever from URL
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryName]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await productApi.getProductByCategoryId(categoryId);
      setProducts(response.data);
      console.log(response.data);
      console.log(categoryId);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="page-container">
      <MyNavbar />
      <div className="content-wrap">
        {products == null || !products.length ? (
          <div className="container text-center my-5">
            <h2>No products found for "{categoryName}"</h2>
          </div>
        ) : (
          <div className="container mb-4">
            <h2>{categoryName}</h2>
            <div className="row">
              {products.map((p) => (
                <div className="col-md-3" key={p.productId}>
                  <Product
                    title={p.productName}
                    description={p.description}
                    image={p.imagePath}
                    price={p.price}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;
