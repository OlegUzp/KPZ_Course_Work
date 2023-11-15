import React, { Component, Fragment } from "react";
import { styled } from "@mui/system";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOn from '@mui/icons-material/LocationOn';
import dayjs from "dayjs";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { connect } from 'react-redux';
import { Paper } from '@mui/material';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import {uploadImage} from '../redux/actions/userActions'
import EditDetails from "../components/EditDetails";
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
const styles = (theme) => ({
    paper: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center items horizontally
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            margin: 'auto', // Center the image horizontally
            display: 'block', // Center the image horizontally
        },
        '.profile-image': {
            width: '50px !important',
            height: '50px !important',
            objectFit: 'cover',
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle',
            },
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0',
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px',
        },
    },
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.clearToken = this.clearToken.bind(this); // Bind the method to the instance
    }

    clearToken() {
        localStorage.removeItem('FBIdToken');
    }
    handleImageChange = (event) => {
        const image = event.target.files[0];
        //send to server
        const formData = new FormData();
        formData.append('image',image,image.name)
        this.props.uploadImage(formData);

    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }
    handleLoginClick = () => {
        // Use the history object to navigate to the '/login' route
        this.props.history.push('/login');
        localStorage.removeItem('FBIdToken')
        window.location.reload();
    }
    render() {
        const {
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authentificated
            }
        } = this.props;
        let profileMarkup = !loading ? (authentificated ? (
            <Paper className="paper">
                <div className="profile-image">
                    <img src={imageUrl} alt="profile" className="image-wrapper" style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        margin: 'auto',
                        display: 'block',
                    }}/>
                    <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                    <Tooltip title="Edit profile picture" placement="top">
                        <IconButton onClick={this.handleEditPicture} variant="contained">
                            <ModeEditOutlineRoundedIcon>Edit</ModeEditOutlineRoundedIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete profile picture" placement="top">
                        <IconButton onClick={this.handleDeletePicture} variant="contained">
                            <RemoveCircleOutlineRoundedIcon>Remove</RemoveCircleOutlineRoundedIcon>
                        </IconButton>
                    </Tooltip>
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <RssFeedIcon />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}{website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarTodayIcon />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                <KeyboardReturnOutlinedIcon onClick={this.handleLoginClick}/>
                <EditDetails/>
            </Paper>
        ) : (
            <Paper className="paper">
                <Typography variant="body2" align="center">
                    No profile found. Please log in again
                </Typography>
                <div className="buttons">
                    <Button variant="contained" component={Link} to="/login" onClick={() => {localStorage.removeItem('FBIdToken')}}>
                        Login
                    </Button>
                    <Button variant="contained" component={Link} to="/signup" onClick={() => {localStorage.removeItem('FBIdToken')}}>
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<p>Loading...</p>);

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
const mapActionsToProps = {uploadImage};
export default connect(mapStateToProps, mapActionsToProps)(withRouter(styled(Profile)(styles)));
