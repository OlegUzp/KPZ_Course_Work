import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { Dialog, DialogContent } from "@mui/material";
import TextField from '@mui/material/TextField';
import { postScream,clearErrors } from "../redux/actions/dataActions";

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.props.clearErrors()
        this.setState({ open: false })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.postScream({ body: this.state.body })
    }

    render() {
        const { errors } = this.state;

        return (
            <Fragment>
                <Button variant="contained" onClick={this.handleOpen} title="Post a scream!">
                    Post scream
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="SCREAM"
                                multiline
                                rows={3}
                                placeholder="Scream a post"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                onChange={this.handleChange}
                                id="standard-basic" variant="standard"
                                fullWidth
                            />
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </form>
                    </DialogContent>
                    <Button variant="outlined" title="close" onClick={this.handleClose} color="inherit">Close</Button>
                    <Button variant="outlined" title="close" color="inherit">Post</Button>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    // You can map relevant state here if needed
});

const mapActionsToProps = {
    postScream ,clearErrors// Make sure this matches the actual name of your action
};

export default connect(mapStateToProps, mapActionsToProps)(PostScream);
