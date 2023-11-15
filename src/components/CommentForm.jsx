import { ErrorSharp } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { submitComment } from "../redux/actions/dataActions";
class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body });
    }

    render() {
        const { authentificated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authentificated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <h1>Додати коментар</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on scream"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button variant="contained" type="submit" onClick={this.handleSubmit}>Submit</Button>
                </form>
                <hr />
            </Grid>
        ) : null;

        return (
            <div>{commentFormMarkup}</div>
        );
    }
}

const mapStateToProps = state => ({
    authentificated: state.user.authentificated
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
