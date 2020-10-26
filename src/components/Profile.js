import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import dayjs from 'dayjs'
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { IconButton } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { uploadImage, logOut } from '../redux/userActions'
import EditDetails from './EditDetails';
import ProfileSkeleton from './ProfileSkeleton';

const styles = {
    paper: {
        padding: 20
    },


    profileImage: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    profileDetails: {
        textAlign: 'center',
        '& span, svg': {
            verticalAlign: 'middle'
        },
        '& a': {
            color: '#00bcd4'
        }
    },
    flexBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    }


}

const Profile = (props) => {
    console.log(props);

    const {
        classes,
        user: {
            credentials: { handle, createdAt, imageUrl, bio, website, location },
            loading,
            authenticated
        }
    } = props;

    const handleEditPicture = () => {
        const fileInput = document.querySelector('#imageInput')
        fileInput.click()
    }
    const handleImageChange = (e) => {
        const image = e.target.files[0]
        //send to server
        const formData = new FormData()
        formData.append('image', image, image.name)
        props.uploadImage(formData)
    }
    const handleLogOut = () => {
        props.logOut()
    }
    return (
        <div>
            {
                !loading ?
                    (
                        authenticated ?
                            (
                                <Paper className={classes.paper}>
                                    <Avatar alt="Remy Sharp" src={imageUrl} className={classes.profileImage} />
                                    <Tooltip title='Edit profile picture' placement='top'>
                                        <IconButton onClick={handleEditPicture}>
                                            <input
                                                type="file"
                                                id="imageInput"
                                                hidden="hidden"
                                                onChange={handleImageChange}
                                            />
                                            <EditIcon color="primary" fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <div className={classes.profileDetails}>
                                        <Typography
                                            component="span"
                                            variant="h6"
                                            className={classes.inline}
                                            color="primary"
                                        >
                                            {`@${handle}`}
                                        </Typography>
                                        <div>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {bio && <Typography variant="body2">{bio}</Typography>}
                                            </Typography>
                                        </div>

                                        {createdAt && (
                                            <div>
                                                <CalendarTodayRoundedIcon color="primary" fontSize="small" />{' '}
                                                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                            </div>
                                        )}


                                        <br />
                                        {location && (
                                            <div className={classes.flexBox}>
                                                <LocationOnIcon color="primary" fontSize="small" /> <span>{location}</span>
                                            </div>
                                        )}


                                        {website && (
                                            <div className={classes.flexBox}>
                                                <LinkIcon color="primary" />
                                                <a href={website} target="_blank" rel="noopener noreferrer">
                                                    {website}
                                                </a>
                                            </div>
                                        )}

                                    </div>

                                    <div className={classes.flexBox}>
                                        <Tooltip title='logout' placement='top'>
                                            <IconButton onClick={handleLogOut}>
                                                <KeyboardReturnIcon color='primary' />
                                            </IconButton>
                                        </Tooltip>
                                        <EditDetails />
                                    </div>
                                </Paper>
                            ) : (<Paper className={classes.paper}>
                                <Typography variant='body2' align='center'>
                                    No profile found ,please login
                                </Typography>
                                <div className={classes.button}>
                                    <Button variant='contained' color='primary' component={Link} to='/login'>login</Button>
                                    <Button variant='contained' color='secondary' component={Link} to='/signup'>signup</Button>

                                </div>
                            </Paper>)
                    ) : (<ProfileSkeleton />)
            }

        </div >
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})



export default connect(mapStateToProps, { uploadImage, logOut })(withStyles(styles)(Profile))
