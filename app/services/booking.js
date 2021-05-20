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
    completeBooking: function (userData, token) {
        return axiosInstance.get('coach/completeBooking', userData, configToken(token))
    },
    getBookings: function (id, token) {
        return axiosInstance.get(`coach/getBookings?CoachId=${id}`, configToken(token))
    },
    getBookingDetails: function (id, token) {
        return axiosInstance.get(`coach/getBookingDetails/${id}`, configToken(token))
    },
    addRatingtoAthele:function(userData){
        return axiosInstance.get(`coach/athleteRating`,userData, configToken(token))
    },
    acceptRequest:function(userData){
        return axiosInstance.get(` coach/acceptRequest`,userData, configToken(token))
    },

};

export default Api;