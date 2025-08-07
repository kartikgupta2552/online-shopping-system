import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllCategories = async () => {
    const response = await axios.get(`${BASE_URL}/category`)
    return response.data
}