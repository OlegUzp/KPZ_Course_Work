import React, { Component } from "react";
import axios from '../config/instance';
import { connect } from 'react-redux';
import { getUserData } from "../redux/actions/dataActions";
import { Grid } from "@mui/material";
import Scream from "../components/Scream";
import StaticProfile from "../components/StaticProfile";

class User extends Component {
    state = {
        profile: null
    };

    componentDidMount() {
        this.setState({
            profile: null
        });
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle);

        axios.get(`/user/${handle}/`)
            .then(res => {
                this.setState({
                    profile: res.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { screams } = this.props.data;
        const screamsMarkup = screams === null ? <p>No screams from user</p> : (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        );
    
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile !== null && <StaticProfile profile={this.state.profile} />}
                </Grid>
            </Grid>
        );
    }
    
}

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
