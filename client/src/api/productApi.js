import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const productApi = {
  getProductByCategoryId: async (categoryId) => {
    const response = await axios.get(`${BASE_URL}/product/category/${categoryId}`)
    return response.data;
  },

  searchProduct: async (keyword) => {
    const response = await axios.get(`${BASE_URL}/product/search`, {
        params : { keyword : keyword }
    })
    return response.data
  }
};

 export default productApi