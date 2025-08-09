import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const userApi = {
    //register user(for both customer and admin)
    register: async (userData) => {
        return axios.post(`${BASE_URL}/api/users/register`, userData);
    },

    //login user
    login: async (email, password) => {
        return axios.post(`${BASE_URL}/api/users/login`, { email, password });
    },

    //get all users(admin)
    getAllUsers: async (token) => {
        return axios.get(`${BASE_URL}/api/users/all`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    },

    //update user profile
    update: async (userId, userData, token) => {
        return axios.put
            (`${BASE_URL}/api/users/${userId}/profile`,
                userData,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
    },

    //delete user(admin)
    delete: async (userId, token) => {
        return axios.delete(`${BASE_URL}/api/users/${userId}/hard-delete`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    },

};

export default userApi;