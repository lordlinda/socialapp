import React, { useState, useEffect, Fragment } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { postScream, clearErrors } from '../redux/dataActions'
const styles = {
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        float: 'right'

    }
}

function PostScream(props) {
    const [post, setPost] = useState({
        open: false,
        body: '',
        errors: {}
    })
    const { open, body, errors } = post

    const handleOpen = () => {
        setPost({ ...post, open: true });
    };
    const handleClose = () => {
        props.clearErrors();
        setPost({ ...post, open: false, errors: {} });
    };
    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        await props.postScream({ body });
        if (!props.UI.errors && !props.UI.loading) {
            setPost({ ...post, open: false, body: '', errors: {} });
        }

    };
    useEffect(() => {
        setPost({
            ...post,
            errors: props.UI.errors
        })


    }, [props.UI.errors])
    const { classes, UI: { loading } } = props

    return (
        <div>
            <Fragment>
                <IconButton onClick={handleOpen}>
                    <AddIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <IconButton
                        onClick={handleClose}
                        className={classes.closeButton}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                placeholder='post'
                                error={errors?.error ? true : false}
                                helperText={errors?.error}
                                className={classes.textField}
                                value={body}
                                onChange={handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Submit
                {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.progressSpinner}
                                    />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        </div>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { postScream, clearErrors }
)(withStyles(styles)(PostScream));