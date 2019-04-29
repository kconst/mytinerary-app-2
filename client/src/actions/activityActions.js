import { GET_ACTIVITIES, ACTIVITIES_LOADING, ADD_ACTIVITY, ADD_AC_SUCCESS } from "./types"

import axios from "axios"

export const getActivities = (itineraryId) => dispatch => {
    dispatch(setActivitiesLoading());
    axios
        .get(`/api/activities/${itineraryId}`)
        .then(res =>
            dispatch({
                type: GET_ACTIVITIES,
                payload: res.data
            }))
}

export const setActivitiesLoading = () => {
    return {
        type: ACTIVITIES_LOADING
    }
}

export const addActivity = (activity, itineraryId) => (dispatch, getState) => {
    axios
        .post(`/api/activities/${itineraryId}`, activity, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ACTIVITY,
                payload: res.data
            })
        )
}

export const addAcSuccess = () => {
    return {
        type: ADD_AC_SUCCESS
    }
}

const tokenConfig = getState => {
    // Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "multipart/form-data"
        }
    }

    // If token, add to headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config
}