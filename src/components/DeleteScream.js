import React, { useState, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteScream } from '../redux/dataActions';
import { IconButton, Tooltip } from '@material-ui/core';

const styles = {
    deleteButton: {
        /*position: 'absolute',
        left: '90%',
        top: '10%'*/
    }
};
function DeleteScream(props) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    const deleteScream = () => {
        props.deleteScream(props.screamId);
        setOpen(false)
    };
    const { classes } = props
    return (
        <div>
            <Fragment>
                <Tooltip title='Delete scream'>
                    <IconButton
                        tip="Delete Scream"
                        onClick={handleOpen}
                        className={classes.deleteButton}
                    >
                        <DeleteOutline color="secondary" fontSize='small' />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this scream ?
          </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={deleteScream} color="secondary">
                            Delete
            </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        </div>
    )
}

export default connect(
    null,
    { deleteScream }
)(withStyles(styles)(DeleteScream));