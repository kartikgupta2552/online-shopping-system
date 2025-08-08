import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getProductByCategoryId = async(categoryId) => {
    const response = await axios.get(`${BASE_URL}/product/category/${categoryId}`)
    return response.data
}