import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    LOADING_SUCCESS
} from '../types';
import { AuthServices, RegisterUser } from '../../services';
import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserProfile = (userData, navigate) => {
    return async (dispatch) => {
        let token = await AsyncStorage.getItem('Token')
        let data = JSON.parse(token)
        if (userData) {
            await dispatch({ type: USER_LOGIN_SUCCESS, userData: userData, userToken: data, loading: false });
            if (navigate != null)
                navigate('TabContainer');
        }
    }
};

const getUserProfile = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        AuthServices.getUserProfile(userData)
            .then(async (responseData) => {
                console.log(responseData.data.requestDetail)
                await AsyncStorage.setItem('USER', JSON.stringify(responseData.data.requestDetail))
                await dispatch(setUserProfile(responseData.data.requestDetail, navigate))
                // if (responseData.data.success) {
                //     console.log(responseData.data.user)
                //     await AsyncStorage.setItem('USER', JSON.stringify(responseData.data.user))
                //     await dispatch(setUserProfile(responseData.data.user, navigate))
                // }
                // else {
                //     dispatch(removeUser(navigate));
                //     dispatch({ type: LOADING_SUCCESS, loading: !loading })
                // }

            })
            .catch(err => { console.log(err) })
    };
};

const removeUser = (navigate) => {
    return async (dispatch) => {
        dispatch({ type: USER_LOGOUT_SUCCESS })
        await navigate('Login')
        await AsyncStorage.removeItem('Token');
        await AsyncStorage.removeItem('USER');

    }
};


export const authActions = {
    setUserProfile,
    removeUser,
    getUserProfile,
};