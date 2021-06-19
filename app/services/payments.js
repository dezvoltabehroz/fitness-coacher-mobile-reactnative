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
    coachPayout: function (userData) {
        return axiosInstance.post('coach/payout', { CoachId: parseInt(userData.id), price: parseInt(userData.price) }, configToken(userData.token))
    },
    coachGraphData: function (id, token) {
        return axiosInstance.get(`coach/graphData?CoachId=${id}`, configToken(token))
    },
    createStripeAccount: function (userData,token) {
        return axiosInstance.post(`coach/createStripeAccount`,userData, configToken(token))
    },
    stripeAccountInfo: function (token) {
        return axiosInstance.get(`coach/accountInfo`, configToken(token))
    },
    stripeAccountVerify: function (token) {
        return axiosInstance.get(`coach/verifyInfo`, configToken(token))
    },

};

export default Api;