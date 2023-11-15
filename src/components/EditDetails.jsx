import React, { Component, Fragment } from 'react';
// import { withRouter } from 'react-router-dom'; // Import withRouter
import { editUserDetails } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
                        
class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        })
    }
    componentDidMount(){
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials)
    }
    handleClose = () => {
        this.setState({open: false})
    }
    handleOpen = () => {
        this.setState({open:true})
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit = (event) => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails)
        this.handleClose();
    }
    render() {
        return (
            <Fragment>
                <Tooltip title="Edit details">
                    <IconButton 
                        onClick={this.handleOpen} 
                        // className={classes.button}
                    >
                        <ModeEditOutlineOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>Edit your details</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    name='bio'
                                    type='text'
                                    label='Bio'
                                    multiline
                                    rows='3'
                                    placeholder='A short bio'
                                    // className={classes.TextField}
                                    value={this.setState.bio}   
                                    onChange={this.handleChange}
                                    fullWidth 
                                />
                                <TextField
                                    name='website'
                                    type='text'
                                    label='Website'
                                    placeholder='Your personal/prof/ website'
                                    // className={classes.TextField}
                                    value={this.setState.website}   
                                    onChange={this.handleChange}
                                    fullWidth 
                                />
                                <TextField
                                    name='location'
                                    type='text'
                                    label='Location'
                                    placeholder='A short information about live'
                                    // className={classes.TextField}
                                    value={this.setState.location}   
                                    onChange={this.handleChange}
                                    fullWidth 
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})
export default connect(mapStateToProps,{editUserDetails})(EditDetails); // Wrap Navbar with withRouter
