import React, { Component, Fragment } from "react";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

import LocationOn from '@mui/icons-material/LocationOn';
import dayjs from "dayjs";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { connect } from 'react-redux';
import { Paper } from '@mui/material';
const StaticProfile = (props) => {
    const { profile } = props;
    
    if (profile === null) {
        return <p>Loading...</p>; // You can display a loading message or another fallback UI
    }
    console.log(profile)
    const { user:{handle, createdAt, imageUrl, bio, website, location} } = profile;    
    return (
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
                </div>
                <hr />
                <div className="profile-details">
                    <Link component={Link} to={`/users/${handle}`} variant="h5">
                        @{handle}
                    </Link>
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
        </Paper>
    )
}
export default StaticProfile;