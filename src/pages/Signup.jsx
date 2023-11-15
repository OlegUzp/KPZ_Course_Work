import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import classes from './Login.module.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import axios from "../config/instance";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
// import { PropTypes } from "prop-types"
class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            message: '',
            errors: {}
        }
    }
    handleLoginClick = () => {
        // Use the history object to navigate to the '/login' route
        this.props.history.push('/login');
        window.location.reload();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault(); // Prevent page refresh
    
        this.setState({
            loading: true,
        });
    
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        try {
            // Send the data to an API using axios
            // console.log(newUserData)
            this.props.signupUser(newUserData,this.props.history);
        } catch (error) {
            // Handle errors here, e.g., display error messages
            console.error(error);
    
            // Reset the loading state if there was an error
            this.setState({
                loading: false,
            });
        }
    };

    handleDelete = () => {
        // Function to clear all input fields
        this.setState({
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
        });
    }
    

    render() {
        const { errors, message } = this.state; // Destructure message from state
        return (
            <div className={`${classes.all}`}>
                <h1>Веб-застосунок 'Моє цікаве життя'</h1>
                <h2>РЕЄСТРАЦІЯ КОРИСТУВАЧА</h2>
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
                        type="text"
                        label="Email"
                        helperText={errors.email !== undefined ? errors.email : false}
                        error={errors.email !== undefined ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth
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
                        fullWidth
                    />
                    <TextField
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        helperText={errors.confirmPassword !== undefined ? errors.confirmPassword : false}
                        error={errors.confirmPassword !== undefined ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        required
                        id="handle"
                        name="handle"
                        type="text"
                        label="handle"
                        helperText={errors.handle !== undefined ? errors.handle : false}
                        error={errors.handle !== undefined ? true : false}
                        value={this.state.handle}
                        onChange={this.handleChange}
                        fullWidth
                    />
                   <Typography variant="body2" className={classes.customError}>
                        {message===undefined ? ' ' : message}
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button type="button" variant="outlined" startIcon={<DeleteIcon />} onClick={this.handleDelete}>
                            Clear
                        </Button>
                        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </Stack>
                    
                    <small>Already have an account? login <Link to ='/login' onClick={this.handleLoginClick}>here</Link></small>
                </Box>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})
export default connect(mapStateToProps,{signupUser})(Signup);
