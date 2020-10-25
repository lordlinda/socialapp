import React, { Fragment, useEffect, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm'

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
// Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../redux/dataActions';
import { Avatar, IconButton, Tooltip } from '@material-ui/core';

const styles = {

    profileImage: {
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '80%'
    },
    expandButton: {
        /* position: 'absolute',
         left: '90%'*/
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    flexBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },

}
function ScreamDialog(props) {

    const [scream, setScream] = useState({
        open: false,
        oldPath: '',
        newPath: ''
    })
    const { open, oldPath, newPath } = scream

    useEffect(() => {
        if (props.openDialog) {
            handleOpen()
        }
    }, [])

    const handleOpen = () => {
        const { userHandle, screamId } = props
        setScream({
            ...scream,
            oldPath: window.location.pathname,
            newPath: `/users/${userHandle}/scream/${screamId}`
        })
        if (oldPath === newPath) {
            setScream({
                ...scream,
                oldPath: `users/${userHandle}`
            })
        }

        window.history.pushState(null, null, newPath)

        setScream({
            ...scream,
            open: true,
            oldPath,
            newPath
        })

        props.getScream(props.openDialog ? props.openDialog : props.screamId)
    }
    const handleClose = () => {
        window.history.pushState(null, null, oldPath)
        setScream({
            ...scream,
            open: false
        })
        props.clearErrors()
    }

    const {
        classes,
        scream: {
            body,
            createdAt,
            likeCount,
            commentCount,
            imageUrl,
            userHandle,
            comments

        },
        UI: { loading }
    } = props;
    return (
        <div className={classes.container}>
            <Fragment>
                <Tooltip title='Expand scream'>
                    <IconButton
                        onClick={handleOpen}
                        className={classes.expandButton}
                    >
                        <UnfoldMoreIcon color="primary" />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <Tooltip title='Close'>
                        <IconButton
                            onClick={handleClose}
                            className={classes.closeButton}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>

                    <DialogContent className={classes.dialogContent}>
                        {
                            loading ? (
                                <div className={classes.spinnerDiv}>
                                    <CircularProgress size={200} thickness={2} />
                                </div>
                            ) : (
                                    <Grid container>
                                        <Grid item sm={1}>

                                            <Avatar alt="Remy Sharp" src={imageUrl} className={classes.profileImage} />

                                        </Grid>
                                        <Grid item sm={8}>
                                            <Typography
                                                component={Link}
                                                color="primary"
                                                variant="h6"
                                                to={`/users/${userHandle}`}
                                            >
                                                @{userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <br />
                                            <Typography variant="body1">{body}</Typography>

                                            <span>{likeCount} likes</span>
                                            <Tooltip title='comments'>
                                                <IconButton>
                                                    <ChatIcon color="primary" />
                                                </IconButton>
                                            </Tooltip>

                                            <span>{commentCount} comments</span>
                                            <CommentForm screamId={props.screamId} />
                                        </Grid>

                                        <Comments comments={comments} />
                                    </Grid>
                                )
                        }
                    </DialogContent>
                </Dialog>
            </Fragment>
        </div>
    )

}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});
export default connect(
    mapStateToProps,
    {
        getScream,
        clearErrors
    }
)(withStyles(styles)(ScreamDialog));