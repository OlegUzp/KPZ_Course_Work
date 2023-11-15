import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

class Comments extends Component {
    render() {
        console.log(this.props);
        const { comments } = this.props;

        return (
            <Grid container spacing={2}>
                {comments ? (
                    comments.map((comment) => {
                        const { body, createdAt, userImage, userHandle } = comment;

                        return (
                            <Fragment key={createdAt}>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={2}>
                                            <img src={userImage} alt="comment" style={{ maxWidth: '100%', height: '100%',objectFit: 'cover',borderRadius: '50%' }} />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <div>
                                                <Typography variant="h6" component={Link} to={`/users/${userHandle}`}>
                                                    {userHandle}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" style={{marginLeft:'20px'}}>
                                                    {dayjs(createdAt).format("DD-MM-YYYY HH:mm")}
                                                </Typography>
                                                <hr />
                                                <Typography variant="body1">{body}</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <hr />
                            </Fragment>
                        );
                    })
                ) : (
                    <Typography variant="body2">No comments yet.</Typography>
                )}
            </Grid>
        );
    }
}

export default Comments;
