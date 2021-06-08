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
    getNotifications: function (offset, token) {
        return axiosInstance.get(`coach/notification?limit=10&offset=${offset}`, configToken(token))
    },
    notificationSetting: function (userData, token) {
        return axiosInstance.post(`user/notificationSetting`, userData, configToken(token))
    },
    notificationRead: function (id, token) {
        return axiosInstance.put(`user/notification/${id}`, {}, configToken(token))
    }



};

export default Api;