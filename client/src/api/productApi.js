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
updateProduct: async (productId, formData, token) => {
  const config = {
    headers: {
      // ✅ Don't set Content-Type for FormData - let browser handle it
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };

  return axiosInstance.put(`${BASE_URL}/product/${productId}`, formData, config);
},
};

export default productApi