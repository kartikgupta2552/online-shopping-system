import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const productApi = {
  getProductByCategoryId: async (categoryId) => {
    const response = await axiosInstance.get(`${BASE_URL}/product/category/${categoryId}`)
    return response.data;
  },

  getProductBySubCategoryId: async(subCategoryId) => {
    const response = await axiosInstance.get(`${BASE_URL}/product/subcategory/${subCategoryId}`)
    return response.data
  },

  searchProduct: async (keyword) => {
    const response = await axiosInstance.get(`${BASE_URL}/product/search`, {
        params : { keyword : keyword }
    })
    return response.data
  },

  getProductById: async (productId) => {
    const response = await axiosInstance.get(`${BASE_URL}/product/${productId}`)
    return response.data
  },

  //get all products
  getAllProducts: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/product`);
    return response.data;
  },

  //add product
  addProduct: async (productData) => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(`${BASE_URL}/product`, productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  //delete product
  deleteProduct: async (productId) => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.delete(`${BASE_URL}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  //update product -> requires multipart request
  updateProduct: async (productId, productData) => {
    const token = localStorage.getItem("token");
    //create formdata for multi form request
    // 1. Create a Blob from your product JSON, set its type
    const productBlob = new Blob(
      [JSON.stringify({
        productName: productData.productName,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
        subCategoryId: productData.subCategoryId,
      })],
      { type: "application/json" }
    );
    // 2. Append it as 'product', so the part's content-type is set correctly
    formData.append("product", productBlob);
    //handle optional image
    if (productData.image) {
      formData.append("image", productData.image);
    }
    //make PUT request with formdata NOT JSON!
    const response = await axiosInstance.put(
      `${BASE_URL}/product/${productId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
};

export default productApi