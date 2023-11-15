import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import {connect} from 'react-redux'
const AuthoRoute = ({component:Component,authentificated,...rest}) => (
    <Route {...rest} render = {(props)=>authentificated===true ? <Redirect to='/'/>:<Component {...props}/>}/>
);
const mapStateToProps = (state) => ({
    authentificated: state.user.authentificated
})
export default connect(mapStateToProps)(AuthoRoute);