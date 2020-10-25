import React, { useState, useEffect, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { editUserDetails } from '../redux/userActions'
import { connect } from 'react-redux'
import { DialogContent, DialogTitle, IconButton, TextField, Tooltip, Button, DialogActions, Dialog } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const styles = {
    textField: {
        margin: '10px auto'
    },
    button: {
        float: "right"
    },
}



function EditDetails(props) {
    const [details, setDetails] = useState({
        bio: '',
        website: '',
        location: '',
        open: false
    })
    const { bio, website, location, open } = details
    const { classes, user: credentials } = props;

    useEffect(() => {
        setDetails({
            ...details,
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',

        })
    }, [])
    const handleOpen = () => {
        setDetails({
            ...details,
            open: !open
        })
    }
    const handleChange = (event) => {
        setDetails({
            ...details,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = () => {
        const userDetails = {
            bio: bio,
            website: website,
            location: location
        };
        props.editUserDetails(userDetails);
        handleOpen()
    };
    return (
        <Fragment>
            <Tooltip title='Edit Details' placement='top'>
                <IconButton onClick={handleOpen} className={classes.button}>
                    <EditIcon color='primary' />
                </IconButton>
            </Tooltip>
            <Dialog
                onClose={handleOpen} open={open} fullWidth maxWidth='sm'>
                <DialogTitle >Edit details</DialogTitle>

                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            tpye="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={bio}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            tpye="text"
                            label="Website"
                            placeholder="Your personal/professinal website"
                            className={classes.textField}
                            value={website}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            tpye="text"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.textField}
                            value={location}
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpen} color="primary">
                        Cancel
            </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
            </Button>
                </DialogActions>
            </Dialog>

        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
