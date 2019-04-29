import { GET_ACTIVITIES, ACTIVITIES_LOADING, ADD_ACTIVITY, ADD_AC_SUCCESS } from "../actions/types"

const initialState = {
    activities: [],
    loading: false,
    addacsuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                loading: false
            }
        case ACTIVITIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_ACTIVITY:
            return {
                ...state,
                activities: [action.payload, ...state.activities],
                addacsuccess: true
            }
        case ADD_AC_SUCCESS:
            return {
                ...state,
                addacsuccess: false
            }
        default:
            return state
    }
}

