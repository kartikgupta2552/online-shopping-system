import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const orderApi = {
    getAllOrders: async (token) => {
        return axiosInstance.get(`${BASE_URL}/api/orders/all`,{
            headers:token ? { Authorization: `Bearer ${token}` } : {},
        });
    },
    changeOrderStatus: async (orderId, status, token) => {
        return axiosInstance.patch(`${BASE_URL}/api/orders/${orderId}/status`, { } , {
            params:{status}, //status sent as query param
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    },
    cancelOrder: async (orderId, token) => {
        return axiosInstance.delete(`${BASE_URL}/api/orders/${orderId}/cancel`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    },
    createOrder: async (orderData, token) => {
        return axiosInstance.post(`${BASE_URL}/api/orders/create`, orderData, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    },
    getOrderById: async (orderId, token) => {
        return axiosInstance.get(`${BASE_URL}/api/orders/${orderId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    },
    //delete order
    deleteOrder: async (orderId, token) => {
        return axiosInstance.delete(`${BASE_URL}/api/orders/${orderId}/delete`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    }
};

export default orderApi;
