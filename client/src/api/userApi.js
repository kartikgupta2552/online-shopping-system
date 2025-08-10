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
    updateUser: async (userId, userData, token) => {
        return axios.put
            (`${BASE_URL}/api/users/${userId}/profile`,
                userData,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
    },

    //delete user(admin)
    deleteUser: async (userId, token) => {
        return axios.delete(`${BASE_URL}/api/users/${userId}/hard-delete`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    },

    //change user role
    changeRole: async (userId, role, token) => {
        return axios.patch(
            `${BASE_URL}/api/users/${userId}/role?role=${role}`,
            { }, //empty body
            {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
        );
    },

    //change user status
    changeStatus: async (userId, status, token) => {
        return axios.patch(
            `${BASE_URL}/api/users/${userId}/status?status=${status}`,
            { }, //empty body
            {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
        );
    },

};

export default userApi;