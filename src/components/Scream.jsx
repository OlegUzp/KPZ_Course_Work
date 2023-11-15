import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../config/firebase';
import { Link } from 'react-router-dom';
import classes from './Scream.module.css';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import axios from '../config/instance'
import {connect} from 'react-redux'
import { likeScream,unlikeScream } from '../redux/actions/dataActions';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import dayjs from 'dayjs';
class Scream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentCount: 0,
            likesCount: props.scream.likeCount,  // Initialize likesCount with the initial value
            isLiked: false
        };
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
    #handleLinkClick = () => {
        // Reload the page after a short delay to ensure the navigation occurs
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };
    likedScream = ()=>{
        if(this.props.user.likes&&this.props.user.likes.find(like=>like.screamId===this.props.scream.screamId))
            return true
        else return false
    }
    
    likeScream = () => {
        // Dispatch the likeScream action
        this.props.likeScream(this.props.scream.screamId);

        // Update the local state to reflect the new like count
        this.setState(prevState => ({
            likesCount: prevState.likesCount + 1,
            isLiked: true
        }));
    }

    unlikeScream = () => {
        // Dispatch the unlikeScream action
        this.props.unlikeScream(this.props.scream.screamId);

        // Update the local state to reflect the new like count
        this.setState(prevState => ({
            likesCount: prevState.likesCount - 1,
            isLiked: false
        }));
    }
    getCommentCount = () => {
        axios
            .get(`/scream/${this.props.scream.screamId}`)
            .then((res) => {
                this.setState({ commentCount: res.data.comments.length });
            })
            .catch((err) => console.log(err));
    };
    getLikesCount = () => {
        axios.get(`/scream/likes/${this.props.scream.screamId}/`)
        .then((res)=>{
            this.setState({likesCount: res.data.likesCount})
        })
        .catch(err=>console.log(err));
    }
    componentDidMount() {
        // Fetch comment count when the component mounts
        this.getCommentCount();
        this.getLikesCount();
        this.likedScream();
    }
    render() {
        const db = getFirestore();
        const {
            scream,
            user: { authentificated,credentials:{handle} },
        } = this.props;
        const q = query(collection(db, 'users'), where('handle', '==', scream.userHandle));
        getDocs(q)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0].data();
                    const userImage = userDoc.imageUrl;
                    scream.userImage = userImage;
                } else {
                    const userImage =
                        'https://firebasestorage.googleapis.com/v0/b/udodcoursework.appspot.com/o/no-img.png?alt=media';
                    scream.userImage = userImage;
                    // console.log(`${userImage}`);
                }
            })
            .catch((error) => {
                console.error('Error fetching user image:', error);
            });
        const likeButton = !authentificated ? (
            <Link to="/login">
                <FavoriteBorder color="primary" />
            </Link>
        ) : this.likedScream() ? (
            <FavoriteOutlinedIcon color="primary" onClick={this.unlikeScream} />
        ) : (
            <FavoriteBorder color="primary" onClick={this.likeScream} />
        );
        const deleteButton =
            authentificated && scream.userHandle === this.props.user.credentials.handle ? (
                <DeleteScream screamId={scream.screamId} />
            ) : null;

        return (
            <Card className={classes.card}>
                <img src={scream.userImage} alt="scream-img" className={classes.image} />
                <CardContent className={classes.content}>
                    <div
                        onClick={this.handleLinkClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <Typography
                            className={classes.a}
                            variant="h5"
                            component={Link}
                            to={`/users/${scream.userHandle}`}
                        >
                            {scream.userHandle}
                        </Typography>
                        {deleteButton}
                    </div>
                    <Typography variant="body2" color="textSecondary">
                        {this.#timeAgo(scream.createdAt)!=='NaN days ago' ? this.#timeAgo(scream.createdAt) : dayjs(scream.createdAt).format('DD-MM-YYYY HH:mm')}
                    </Typography>
                    <Typography variant="body1">{scream.body}</Typography>
                    {likeButton}
                    <span>{' '}{this.state.likesCount} like(s){'  '}</span>
                    <InsertCommentOutlinedIcon />
                    <span>{` `}{this.state.commentCount} comment(s)</span>
                    <ScreamDialog screamId = {scream.screamId} userHandle={scream.userHandle}/>
                </CardContent>
            </Card>
        );
    }
    
}
const mapStateToProps = state => ({
    user: state.user
})
const mapActionsToProps = {
    likeScream,
    unlikeScream
}
export default connect(mapStateToProps,mapActionsToProps)(Scream);
