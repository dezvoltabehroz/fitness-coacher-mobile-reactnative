import axios from 'axios';
import { BASE_URL } from '../enviroments';

let axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,

});
axiosInstance.interceptors.request.use(function (config) {
    if (config.data) {
        config.data = JSON.stringify(config.data)
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;
