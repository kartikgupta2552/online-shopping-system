import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// API for category management
const categoryApi = {
    //create category -> admin function
    createCategory: async (data) => {
        const token = localStorage.getItem("token");
        return axios.post(`${BASE_URL}/category`, data, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
    },
    //update category -> admin function
    updateCategory: async (id, data) => {
        const token = localStorage.getItem("token");
        return axios.put(`${BASE_URL}/category/${id}`, data, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
    },
    //delete category -> admin function
    deleteCategory: async (id) => {
        const token = localStorage.getItem("token");
        return axios.delete(`${BASE_URL}/category/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
    },
    //view all categories -> no need for authorization
    getAllCategories: async () => {
        return axios.get(`${BASE_URL}/category`)
    },
}
export default categoryApi