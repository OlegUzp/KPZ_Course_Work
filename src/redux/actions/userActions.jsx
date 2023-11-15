import dispatch from 'dispatch';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTIFICATED,LOADING_USER } from '../reducers/types';
import axios from '../redux_config/instance';

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      });
    });
};

export const signupUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization']
  dispatch({type: SET_UNAUTHENTIFICATED});
}

export const getUserData = () => (dispatch) => {
  dispatch({type: LOADING_USER})
  axios.get('/user')
    .then(res=>{
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err=>console.log(err))
}

export const uploadImage = (formData) => (dispatch) => {
  console.log(formData)
  dispatch({type: LOADING_USER})
  axios.post('/user/image',formData)
    .then(()=>{
      dispatch(getUserData())
    })
    .catch(err=> console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({type:LOADING_USER})
  axios.post('/user',userDetails)
    .then(()=>{
      dispatch(getUserData())
    })
    .catch(err=>console.log(err))
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}