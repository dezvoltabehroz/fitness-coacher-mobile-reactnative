import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json' } }
let configToken = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
}
const Api = {
    userLogin: function (userData) {
        return axiosInstance.post('login', {
            email: userData.email,
            password: userData.password
        }, config)
    },
    getUserProfile: function (userData) {
        return axiosInstance.get(`coach/details/${userData.id}`, configToken(userData.token))
    },
    updateProfile: function (id, userData, token) {
        return axiosInstance.put(`coach/updateCoach/${id}`, userData, configToken(token))
    },
    userRegister: function (userData) {
        return axiosInstance.post('coach/registerCoach', userData, config)
    },
    forgotPassword: function (email) {
        return axiosInstance.post('forgot-password', {
            "email": email
        }, config)
    },
    reSendOtp: function (email) {
        return axiosInstance.post('resend-otp', {
            "email": email
        }, config)
    },
    verifyOtp: function (userData) {
        return axiosInstance.post('verify-otp', {
            "email": userData.email,
            "otp": userData.otp
        }, config)
    },
    resetPassword: function (userData) {
        return axiosInstance.post('reset-password', {
            "email": userData.email,
            "password": userData.password,
            "otp": userData.otp
        }, config)
    },
    changePassword: function (id, userData, token) {
        return axiosInstance.put(`user/change-password/${id}`, userData, configToken(token))
    },
    getUrl: function (userData) {
        return axiosInstance.post(`getUrl`, userData, config)
    },
    addFCMToken: function () {
        return axiosInstance.post(`user/addFCMToken`, userData, configToken(token))
    },
    validateUser: function (token) {
        return axiosInstance.post(`validation`, {}, configToken(token))
    }
};

export default Api;