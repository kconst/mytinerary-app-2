import { combineReducers } from "redux"
import cityReducer from "./cityReducer"
import itineraryReducer from "./itineraryReducer"
import activityReducer from "./activityReducer"
import commentReducer from "./commentReducer"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"

export default combineReducers({
    cities: cityReducer,
    itineraries: itineraryReducer,
    activities: activityReducer,
    comments: commentReducer,
    auth: authReducer,
    errors: errorReducer,
})
