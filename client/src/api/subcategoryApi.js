import axios from "axios";
import axiosInstance from './axiosInstance';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const subcategoryApi = {
    createSubcategory: async (data) => {
        const token = localStorage.getItem("token");
        return axiosInstance.post(`${BASE_URL}/subcategory`, data,
            {headers: token ? { Authorization: `Bearer ${token}` } : {} }
        )
    },
    updateSubcategory: async (id, data) => {
        const token = localStorage.getItem("token");
        return axiosInstance.put(`${BASE_URL}/subcategory/${id}`, data,
            {headers: token ? { Authorization: `Bearer ${token}` } : {}}
        )
    },
    deleteSubcategory: async (id) => {
        const token = localStorage.getItem("token");
        return axiosInstance.delete(`${BASE_URL}/subcategory/${id}`,
            {headers: token ? { Authorization: `Bearer ${token}` } : {}}
        )
    },
    //no need for authorization
    getAllSubcategories: async () => {
        return axiosInstance.get(`${BASE_URL}/subcategory`);
    },
};

export default subcategoryApi;
