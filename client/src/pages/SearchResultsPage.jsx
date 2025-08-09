import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import productApi from '../api/productApi';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const keyword = useQuery().get("keyword")?.toLowerCase() || "";
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try{
      const productData = await productApi.searchProduct(keyword)
      setProducts(productData.data)
    }
    catch(error){
      console.log("Error fetching products data in search product:", error);
    }
  }

  return (
    <>
      <MyNavbar />
      <div className="container my-4">
        <h2>Search Results for "{keyword || "..."}"</h2>
        <div className="row">
          {products.length ? (
            products.map((p) => (
              <div className="col-md-3 mb-3" key={p.productId}>
                <Product
                  title={p.productName}
                  description={p.description}
                  image={p.imagePath}
                  price={p.price}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-secondary fs-5 mt-4">
                No products found. Life's tough, huh?
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResultsPage;
