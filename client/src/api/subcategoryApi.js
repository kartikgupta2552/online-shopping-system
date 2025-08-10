import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const subcategoryApi = {
    createSubcategory: async (data) => {
        const token = localStorage.getItem("token");
        return axios.post(`${BASE_URL}/subcategory`, data,
            {headers: token ? { Authorization: `Bearer ${token}` } : {} }
        )
    },
    updateSubcategory: async (id, data) => {
        const token = localStorage.getItem("token");
        return axios.put(`${BASE_URL}/subcategory/${id}`, data,
            {headers: token ? { Authorization: `Bearer ${token}` } : {}}
        )
    },
    deleteSubcategory: async (id) => {
        const token = localStorage.getItem("token");
        return axios.delete(`${BASE_URL}/subcategory/${id}`,
            {headers: token ? { Authorization: `Bearer ${token}` } : {}}
        )
    },
    //no need for authorization
    getAllSubcategories: async () => {
        return axios.get(`${BASE_URL}/subcategory`);
    },
};

export default subcategoryApi;
