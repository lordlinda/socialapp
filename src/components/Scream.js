import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ScreamDialog from './ScreamDialog';
import DeleteScream from './DeleteScream';
import LikeButton from './LikeButton';
import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux'

const styles = {
    card: {
        display: "flex",
        marginBottom: "20px",
    },
    link: {
        textDecoration: 'none'
    },
    content: {
        objectFit: 'cover',
    },
    image: {
        margin: 20,
    },
    flexBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },

}

function Scream(props) {

    const { classes,
        scream: { body, createdAt, imageUrl, screamId, commentCount, userHandle },
        user: {
            authenticated,
            credentials: { handle }
        }
    } = props
    dayjs.extend(relativeTime)


    return (
        <div>
            <Card className={classes.card}>
                <Avatar alt="Remy Sharp" src={imageUrl} className={classes.image} />

                <CardContent>
                    <Typography variant='h6'
                        component={Link}
                        to={`/users/${userHandle}`}
                        className={classes.link}
                        color='primary'
                    >{userHandle}</Typography>

                    <Typography variant='body1'>{body}</Typography>
                    <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()
                    }</Typography>
                    <div className={classes.flexBox}>
                        <div>
                            <LikeButton screamId={screamId} />
                        </div>
                        <div>
                            <Tooltip title='comments'>
                                <IconButton tip="comments">
                                    <ChatIcon color="primary" fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <ScreamDialog
                                screamId={screamId}
                                userHandle={userHandle}
                                openDialog={props.openDialog}
                            />
                        </div>
                        {
                            authenticated && userHandle === handle ? (
                                <DeleteScream screamId={screamId} />
                            ) : null
                        }
                    </div>
                    <span>{commentCount} comments</span>

                </CardContent>
            </Card>

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream))

