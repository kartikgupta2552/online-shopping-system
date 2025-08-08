import React, { useEffect, useState } from "react";
import MyNavbar from "../components/MyNavbar.jsx";
import Product from "../components/Product.jsx";
import Footer from "../components/Footer.jsx";
import categories from "../dummy-data/Categories.js";
import products from "../dummy-data/products.js";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCategories } from "../api/categoryApi.js";
// import categories from '../Dummy Data/Categories';
import { getProductByCategoryId } from '../api/productApi';

function HomePage() {
  
  // const selectedCategories = categories.slice(0, 3);
  const location = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([])
  const [productsByCategory, setProductsByCategory] = useState({})

  // 🩸 Add state for temp login-success alert
  const [showLoginSuccess, setShowLoginSuccess] = useState(
    location.state?.loginSuccess || false
  );

  useEffect(() => {
    fetchData()
  }, [])

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
          state: { ...location.state, loginSuccess: false },
        });
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [location.state?.loginSuccess, navigate, location.pathname]);


  const fetchData = async () => {
      try{
        const categoryData = await getAllCategories()
        const responseCategories = categoryData.data
        setCategories(responseCategories)

        // it will start calling api's but do not wait for their completion, it will just return array of promises
        const productPromises = responseCategories.map((cat) =>
          getProductByCategoryId(cat.categoryId)
        )

        // here it will wait for all api calls to finish
        const productResult = await Promise.all(productPromises)

        const productMap = {}
        responseCategories.forEach((cat,index) => {
          productMap[cat.categoryId] = productResult[index].data
        })
// console.log(productMap)
        setProductsByCategory(productMap);
      }
      catch(error){
        console.log("Error fetching data:", error)
      }
    }

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
        {categories.map((cat) => (
          <div key={cat.categoryId} className="mb-5 mt-4">
            <h2 className="mb-4">{cat.categoryName}</h2>
            <div className="row d-flex align-items-stretch g-4">
                {productsByCategory[cat.categoryId]?.map((product) => (
                  <div className="col-md-3 d-flex" key={product.productId}>
                    <Product 
                    id={product.productId}
                    title={product.productName}
                    description={product.description}
                    price={product.price}
                    image={product.imagePath}
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
