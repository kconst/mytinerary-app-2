import axios from "axios";
import { returnErrors } from "./errorActions"
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    ADD_FAVOURITE,
    DELETE_FAVOURITE
} from "./types"


// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    axios.get("/api/auth/user", tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = user => dispatch => {
    axios
        .post("/api/users", user, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        })
        .then(res => dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTRATION_FAIL"));
            dispatch({
                type: REGISTRATION_FAIL
            })
        })
}

export const login = ({ username, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({ username, password });

    axios.post("/api/auth", body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const updateUserDetails = (user, userId) => (dispatch, getState) => {
    axios
        .put(`/api/users/${userId}`, user, tokenConfig(getState))
        .then(() =>
            dispatch({
                type: UPDATE_USER,
                payload: user
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const updateUserSuccess = () => {
    return {
        type: UPDATE_USER_SUCCESS
    }
}




// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config
}


export const socialLogin = (user) => dispatch => {
    axios.post("/api/auth/social", user)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTRATION_FAIL"));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Favourites

export const addFavourite = (favourite, userId) => (dispatch, getState) => {
    axios
        .put(`/api/users/${userId}/favourites`, favourite, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_FAVOURITE,
                payload: res.data
            })
        )
}

export const deleteFavourite = (itineraryId, userId) => (dispatch, getState) => {
    axios
        .delete(`/api/users/${userId}/favourites/${itineraryId}`, tokenConfig(getState))
        .then(() => dispatch({
            type: DELETE_FAVOURITE,
            payload: itineraryId
        }))
}