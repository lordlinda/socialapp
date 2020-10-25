import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
const styles = {
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
    },
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
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
    '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
    },
    '& svg.button': {
        '&:hover': {
            cursor: 'pointer'
        }
    }

}
function StaticProfile(props) {
    const {
        classes,
        profile: { handle, createdAt, imageUrl, bio, website, location }
    } = props;

    return (
        <div>
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className={classes.profileImage} />
                    </div>
                    <div className={classes.profileDetails}>
                        <MuiLink
                            component={Link}
                            to={`/users/${handle}`}
                            color="primary"
                            variant="h5"
                        >
                            @{handle}
                        </MuiLink>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> <span>{location}</span>
                            </Fragment>
                        )}
                        <br />
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}
                                    {website}
                                </a>
                            </Fragment>
                        )}
                        <br />
                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default withStyles(styles)(StaticProfile);
