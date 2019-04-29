import {
    GET_ITINERARIES,
    GET_ALL_ITINERARIES,
    ITINERARIES_LOADING,
    ADD_ITINERARY,
    ADD_IT_SUCCESS,
    DELETE_ITINERARY,
    UPDATE_ITINERARY,
    SET_ITINERARY_RATING,
    SET_ITINERARY_LIKES
} from "../actions/types"

const initialState = {
    itineraries: [],
    loading: false,
    additsuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITINERARIES:
            return {
                ...state,
                itineraries: action.payload,
                loading: false
            }
        case GET_ALL_ITINERARIES:
            return {
                ...state,
                itineraries: action.payload,
                loading: false
            }
        case ITINERARIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_ITINERARY:
            return {
                ...state,
                itineraries: [action.payload, ...state.itineraries],
                additsuccess: true
            }
        case ADD_IT_SUCCESS:
            return {
                ...state,
                additsuccess: false
            }
        case DELETE_ITINERARY:
            return {
                ...state,
                itineraries: state.itineraries.filter(itinerary => itinerary._id !== action.payload),
                additsuccess: true
            }
        case UPDATE_ITINERARY:
            return {
                ...state,
                itineraries: state.itineraries.map(itinerary => itinerary._id === action.payload._id ? action.payload : itinerary),
                additsuccess: true
            }
        case SET_ITINERARY_RATING:
            return {
                ...state,
                itineraries: state.itineraries.map(itinerary => {
                    if (itinerary._id === action.payload.itineraryId) {
                        return Object.assign({}, itinerary, { rating: action.payload.rating })
                    } else { return itinerary }
                }),
            }
        case SET_ITINERARY_LIKES:
            return {
                ...state,
                itineraries: state.itineraries.map(itinerary => {
                    if (itinerary._id === action.payload.itineraryId) {
                        return Object.assign({}, itinerary, { likes: action.payload.likes })
                    } else { return itinerary }
                }),
            }
        default:
            return state
    }
}

