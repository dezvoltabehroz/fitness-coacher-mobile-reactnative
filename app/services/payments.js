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
    getAmountOfCoaches: function (id, token) {
        return axiosInstance.get(`coach/getAmounts/${id}`, configToken(token))
    },
    coachPayout: function (userData, token) {
        return axiosInstance.get('coach/payout', userData, configToken(token))
    },
    coachGraphData: function (id, token) {
        return axiosInstance.get(`coach/graphData?CoachId=${id}&days=15`, configToken(token))
    },

};

export default Api;