import { GET_COMMENTS, COMMENTS_LOADING, ADD_COMMENT, DELETE_COMMENT } from "../actions/types"

const initialState = {
    comments: [],
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false
            }
        case COMMENTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [action.payload, ...state.comments],
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload)
            }
        default:
            return state
    }
}

