
import PropTypes from 'prop-types';  // Add this line for PropTypes
import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import classes from './Login.module.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
// import axios from "../config/instance";
import { Typography } from "@mui/material";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom";

import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            message: '',
            errors: {}
        }
    }
    
    handleSignupClick = () => {
        // Use the history object to navigate to the '/login' route
        this.props.history.push('/signup');
        window.location.reload();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    // componentDidUpdate(prevProps) {
    //     if (this.props.UI.errors !== prevProps.UI.errors) {
    //         const newErrors = this.props.UI.errors;
    //         if (newErrors && newErrors.data && newErrors.data.errors) {
    //             this.setState({ errors: newErrors.data.errors });
    //         }
    //     }
    // }
    handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page refresh
    
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
    
        this.props.loginUser(userData,this.props.history)
        .then(()=>{})
        .catch(err=>{
            console.error(err);
            // Handle the error, e.g., display a generic error message
            this.setState({
                message: "Login unsuccessful. Please check your credentials.",
            });
        })
    };
    

    handleDelete = () => {
        // Function to clear the email and password fields
        this.setState({
            email: '',
            password: '',
        });
    }

    render() {
        // const {classes,UI:{loading}}=this.props;
        const { errors, message } = this.state; // Destructure message from state
        return (
            <div className={`${classes.all}`}>
                <h1>Веб-застосунок 'Моє цікаве життя'</h1>
                <h5>Студента 3 курсу гр. 6.1211-2пі Удода О.С.</h5>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                >
                    <TextField
                        required
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        helperText={errors.email !== undefined ? errors.email : false}
                        error={errors.email !== undefined ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        helperText={errors.password !== undefined ? errors.password : false}
                        error={errors.password !== undefined ? true : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    {message && ( // Check if message is not empty and display it
                        <Typography variant="body2" className={classes.customError}>
                            {message}
                        </Typography>
                    )}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button type="button" variant="outlined" startIcon={<DeleteIcon />} onClick={this.handleDelete}>
                            Delete
                        </Button>
                        <Button type="submit" variant="contained" endIcon={<SendIcon>Send</SendIcon>}>Send
                        </Button>
                    </Stack>
                    <small>Don`t have an account? Click <Link to='/signup' onClick={this.handleSignupClick}>here</Link></small>
                </Box>
            </div>
        );
    }
}

// Map state to props
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

// Map actions to props
const mapActionsToProps = {
    loginUser,
};


export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login)); // Connect component to Redux