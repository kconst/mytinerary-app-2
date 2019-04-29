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
} from "../actions/types"

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    updateSuccess: false.isAuthenticated,
    favourites: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                favourites: action.payload.favourites
            }
        case LOGIN_SUCCESS:
        case REGISTRATION_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                favourites: action.payload.user.favourites
            }
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTRATION_FAIL:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
                updateSuccess: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateSuccess: false
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [action.payload, ...state.favourites],
            }
        case DELETE_FAVOURITE:
            return {
                ...state,
                favourites: state.favourites.filter(favourite => favourite.itineraryId !== action.payload),
            }
        default:
            return state
    }
}