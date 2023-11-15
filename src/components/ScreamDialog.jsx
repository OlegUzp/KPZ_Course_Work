import React, {Component, Fragment} from "react";
import { getScream } from "../redux/actions/dataActions";
import {connect} from 'react-redux'
import Button from '@mui/material/Button';
import { DialogContent, Grid, Typography } from "@mui/material";
import classes from './ScreamDialog.module.css'
import dayjs from "dayjs";
import { Link } from "react-router-dom/cjs/react-router-dom";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Comments from "./Comments";
import CommentForm from "./CommentForm";
class ScreamDialog extends Component {
    state = {
        open: false
    }
    componentWillReceiveProps() {
        this.setState({body: ''})
    }
    handleOpen = () => {
        this.setState({open:true})
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        this.setState({open:false})
    }
    #timeAgo(timestamp) {
        // Convert Firestore Timestamp to JavaScript Date
        const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
    
        const now = new Date();
        const timeDifference = now - date;
    
        const seconds = Math.floor(timeDifference / 1000);
        if (seconds < 60) {
            return `${seconds} seconds ago`;
        }
    
        const minutes = Math.floor(timeDifference / (1000 * 60));
        if (minutes < 60) {
            return `${minutes} minutes ago`;
        }
    
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        if (hours < 24) {
            return `${hours} hours ago`;
        }
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return `${days} days ago`;
    }
    render() {
        const { screamId, scream: { body, createdAt, likeCount, commentCount, userImage, userHandle, comments } } = this.props;

        const dialogMarkUp = this.state.open ? (
            <Grid container spacing={2} className={classes.dialogContainer}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" style={{maxWidth: '150px', maxHeight:'200px', borderRadius:'50%'}} />
                </Grid>
                <Grid item sm={7} className={classes.dialogContent}>
                    <Typography
                        component={Link}
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt) === 'Invalid Date' ? this.#timeAgo(createdAt) : dayjs(createdAt).format('DD-MM-YYYY HH:mm')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </Grid>
                <hr className={classes.separator} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        ) : (null);

        return (
            <Fragment>
                <Button variant="contained" onClick={this.handleOpen} title="Expand scream">
                    Expand
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <Button variant="contained" onClick={this.handleClose} title="Close">Close</Button>
                    <DialogContent>
                        {dialogMarkUp}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    scream: state.data.scream
});

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(ScreamDialog);
