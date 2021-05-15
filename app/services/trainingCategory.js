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
    allTrainingTypes: function () {
        return axiosInstance.get('admin/allTrainingTypes', config)
    },
    subCategories: function (id) {
        return axiosInstance.get(`admin/subCategories/${id}`, config)
    },
    getSkillsBy: function (id) {
        return axiosInstance.get(`admin/getSkillsBY/${id}`, config)
    }

};

export default Api;