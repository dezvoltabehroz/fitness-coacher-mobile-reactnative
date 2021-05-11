import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    LOADING_SUCCESS,
    USER_UPDATE_PROFILE_INFO_SUCCESS,
    USER_EMAIL_AND_PASSWORD_SUCCESS,
    HEALTH_AND_SEFATY_SUCCESS
} from '../types';

const initialState = {
    userData: {},
    isUserLogedIn: false,
    name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    photo: '',
    isVerified: false,
    verificationCode: '',
    loading: false,
    userToken: '',
    modal: true

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isUserLogedIn: true,
                userData: action.userData,
                userToken: action.userToken,
                loading: action.loading
            };
        case USER_LOGOUT_SUCCESS:
            return {
                initialState
            };
        case USER_SOCIALNETWORK_USERDATA_SUCCESS:
            return {
                ...state,
                name: action.userData.name,
                photo: action.userData.photo
            }
        case IS_USER_VERIFIED_SUCCESS:
            return {
                ...state,
                isVerified: true,
                loading: action.loading
            }
        case SEND_CODE_TO_USER_PHONENUMBER_SUCCESS:
            return {
                ...state,
                phone: action.userData.phone,
                loading: action.loading
            }
        case LOADING_SUCCESS:
            return {
                ...state,
                loading: action.loading
            }
        case USER_UPDATE_PROFILE_INFO_SUCCESS:
            return {
                ...state,
                name: action.userData.name,
                dob: action.userData.dob,
                gender: action.userData.gender,
                photo: action.userData.photo,
                loading: action.loading
            }
        case USER_EMAIL_AND_PASSWORD_SUCCESS:
            return {
                ...state,
                email: action.email,
                password: action.password,
                loading: action.loading
            }
        case HEALTH_AND_SEFATY_SUCCESS:
            return {
                ...state,
                modal: action.modal
            }
        default:
            return state;
    }
};

export default authReducer;
