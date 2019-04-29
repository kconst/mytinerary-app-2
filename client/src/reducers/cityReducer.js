import { GET_CITIES, ADD_CITY, CITIES_LOADING, ADD_SUCCESS, DELETE_CITY, UPDATE_CITY } from "../actions/types"

const initialState = {
    cities: [],
    loading: false,
    addsuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CITIES:
            return {
                ...state,
                cities: action.payload,
                loading: false
            }
        case CITIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_CITY:
            return {
                ...state,
                cities: [action.payload, ...state.cities],
                addsuccess: true
            }
        case DELETE_CITY:
            return {
                ...state,
                cities: state.cities.filter(city => city.name !== action.payload),
                addsuccess: true
            }
        case ADD_SUCCESS:
            return {
                ...state,
                addsuccess: false
            }
        case UPDATE_CITY:
            return {
                ...state,
                cities: state.cities.map(city => city.name === action.payload.name ? action.payload : city),
                addsuccess: true
            }
        default:
            return state
    }
}

