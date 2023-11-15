import React, { Component } from "react";
import Grid from '@mui/material/Grid';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../config/firebase'
import Scream from '../components/Scream'
// import classes from './Main.module.css'
// import relativeTime from 'dayjs/plugin/relativeTime'
import axios from "../config/instance";
import Profile from "./Profile";
import {connect} from 'react-redux'
import { getScreams } from "../redux/actions/dataActions";
class Main extends Component {
    state = {
        screams: [], // Initialize with an empty array
    };
    componentDidMount(){
        this.props.getScreams()
    }
    render() {
        const {screams,loading}=this.props.data;
        const recentScreamData = !loading ? (
            screams.map((scream) =>
              <Scream key={scream.id} scream={scream} />
            )
          ) : <p>Loading...</p>;
          
        // console.log(this.state.screams)
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentScreamData}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    data: state.data
})
export default connect(mapStateToProps,{getScreams})(Main);
