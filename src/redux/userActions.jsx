
import { SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI, SET_AUTHENTIFICATED } from "./reducers/types";
const initialState = {
    authentificated: false,
    credentials: {},
    likes: []
}
export default function(state=initialState,action){
    switch(action.type) {
        case SET_AUTHENTIFICATED:
            return {
                ...state,
                authentificated:true
            };
        case SET_AUTHENTIFICATED:
            return initialState;
        case SET_USER:
            return {
                authentificated: true,
                ...action.payload
            }
        default:
            return state
    }
} 