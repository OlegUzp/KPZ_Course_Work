import { SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI, SET_AUTHENTIFICATED, SET_UNAUTHENTIFICATED,LOADING_USER,LIKE_SCREAM, UNLIKE_SCREAM } from "./types";
const initialState = {
    authentificated: false,
    loading: false,
    credentials: {},
    likes: []
}
export default function(state=initialState,action) {
    switch(action.type){
        case SET_AUTHENTIFICATED:
            return {
                ...state,
                authentificated: true
            }
        case SET_UNAUTHENTIFICATED:
            return initialState
        case SET_USER:
            return {
                authentificated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return{
                ...state,
                likes: state.likes.filter(like=>like.screamId!==action.payload.screamId)
            }
        default:
            return state;
    }

}