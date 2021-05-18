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
        return axiosInstance.get('coach/allTrainingTypes', config)
    },
    subCategories: function (id) {
        return axiosInstance.get(`coach/subCategories/${id}`, config)
    },
    getSkillsBy: function (id) {
        return axiosInstance.get(`coach/getAllSkills`, config)
    }

};

export default Api;