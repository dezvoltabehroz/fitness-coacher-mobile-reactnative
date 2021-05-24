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
    getNotifications: function (token) {
        return axiosInstance.get(`coach/notification`, configToken(token))
    },
    notificationSetting: function (userData, token) {
        return axiosInstance.post(`user/notificationSetting`, userData, configToken(token))
    }


};

export default Api;