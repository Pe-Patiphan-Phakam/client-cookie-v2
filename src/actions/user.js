import axios from "axios"
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        localStorage.removeItem('path');
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    const MAIN_PATH = 'http://127.0.0.1:5000/cookies';
    return async (dispatch) => {
        const res = await axios.post(''+MAIN_PATH+'/api/users/checklogin', creds);
        if (res.data.data.statusLogin === true) {
            localStorage.setItem('authenticated', true);
            localStorage.setItem('path', res.data.data.data[0].path);
            dispatch(receiveLogin());
        } else {
            dispatch(loginError('Please check username and password. Try again'));
        }
    }
}
