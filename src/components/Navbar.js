import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; // Import withRouter
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PostScream from './PostScream';
class Navbar extends Component {
    handleLoginClick = () => {
        // Use the history object to navigate to the '/login' route
        this.props.history.push('/login');
        localStorage.removeItem('FBIdToken')
        window.location.reload();
    }

    handleHomeClick = () => {
        // Use the history object to navigate to the '/' (home) route
        this.props.history.push('/');
    }

    handleSignupClick = () => {
        // Use the history object to navigate to the '/signup' route
        this.props.history.push('/signup');
        localStorage.removeItem('FBIdToken')
        
        // Refresh the page after clicking 'Signup'
        window.location.reload();
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="green"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        ></IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Веб-додаток 'Моє цікаве життя' засобами React Node.js Express.js Redux
                        </Typography>
                        <Button color="inherit">
                            <PostScream>Post</PostScream>
                        </Button>
                        <Button color="inherit" onClick={this.handleLoginClick}>Login</Button>
                        <Button color="inherit" onClick={this.handleHomeClick}>Home</Button>
                        <Button color="inherit" onClick={this.handleSignupClick}>Signup</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}

export default withRouter(Navbar); // Wrap Navbar with withRouter
