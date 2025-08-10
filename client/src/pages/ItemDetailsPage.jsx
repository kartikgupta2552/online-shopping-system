import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import headphoneImg from '../assets/headphones.jpg';
import MyNavbar from '../components/MyNavbar';
import { useLocation } from 'react-router-dom';
import productApi from '../api/productApi';
import Product from '../components/Product';
const ItemDetailsPage = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const location = useLocation()
  const productId = location.state?.productId
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  
  useEffect(() => {
    fetchProductData()
  },[productId])

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

  const fetchProductData = async () => {
    try{
      const productData = await productApi.getProductById(productId)
      setProduct(productData.data)
      
      const relatedProductData = await productApi.getProductBySubCategoryId(productData.data.subCategoryId)
      setRelatedProducts(relatedProductData.data)
    }
    catch(error){
      console.log("Error fetching Product data:", error)
    }
  }
    
  return (
    <div className="page-container">
      {/* Navbar */}
     
     
      <MyNavbar/>

      {/* Product Details */}
      <div className="container-fluid mb-5 content-wrap">
        <div className="row mb-4">
          <div className="col-md-5">
            <img src={`${BASE_URL}${product.imagePath}`}alt="Product" className="img-fluid rounded shadow"  />
          </div>
          <div className="col-md-7">
            <h3><strong>Name: </strong>{product.productName}</h3>
            <p><strong>Details: </strong> 
            {product.description}
            </p>
            <h4 className="text-success">Price: ₹{product.price}</h4>
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
          {relatedProducts.map((product) => (
            product.productId != productId && (
              <div className="col-6 col-md-2 mb-2 me-4" key={product.productId}>
              <Product 
                  id={product.productId}
                  title={product.productName}
                  description={product.description}
                  price={product.price}
                  image={product.imagePath}
                  variant='small'
                  />
            </div>
            )
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
    </div>
  );
};

export default ItemDetailsPage;
