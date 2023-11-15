import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthRoute from './util/AuthRoute'

import {Provider} from 'react-redux'
import store from './redux/reducers/store';
import { SET_AUTHENTIFICATED } from './redux/reducers/types';
import { logoutUser,getUserData } from './redux/actions/userActions';

import styles from './App.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import axios from './config/instance'
import user from './pages/user';
axios.defaults.baseURL='https://europe-west1-udodcoursework.cloudfunctions.net/api'
// let authentificated;
const token=localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    // Token is expired, redirect to login and remove the token
    window.location.href = '/login';
    // authentificated = false;
    localStorage.removeItem('FBIdToken');
  } else {
    // authentificated = true;
    store.dispatch({type:SET_AUTHENTIFICATED})
    axios.defaults.headers.common['Authorization']=token;
    store.dispatch(getUserData())
  }
}
class App extends Component {
  #theme = createTheme({
    palette: {
      primary: {
        main: '#3949ab',
      },
      secondary: {
        main: '#e65100',
      },
    },
    typography: {
      useNextVariants: true,
    }
  });

  render() {
    return (
      <ThemeProvider theme={this.#theme}>
        <Provider store={store}>
            <Router>
                <Navbar />
                <div className={styles.Container}>
                  <Switch>
                    <AuthRoute path="/login" component={Login}/>
                    <AuthRoute path="/signup" component={Signup}/>
                    <Route path="/users/:handle" component={user}/>
                    <Route path="/" component={Main} />
                  </Switch>
                </div>
            </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
