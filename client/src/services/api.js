import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerDevice = async (deviceAddress) => {
    try {
        const response = await api.post('/devices/register', { deviceAddress });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const grantPermission = async (deviceAddress, resource) => {
    try {
        const response = await api.post('/devices/grant', { deviceAddress, resource });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export default api;
