import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/userActions';
function Notifications(props) {

    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = (event) => {
        setAnchorEl(event.target)
    };
    const handleClose = () => {
        setAnchorEl(null)
    };
    const onMenuOpened = () => {
        let unreadNotificationsIds = props.notifications
            .filter((notification) => notification.read === 'false')
            .map((notification) => notification.notificationId)
        props.markNotificationsRead(unreadNotificationsIds)
    };
    const notifications = props.notifications


    dayjs.extend(relativeTime);
    return (
        <div>
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleOpen}
                    >
                        {
                            notifications && notifications.length > 0 ?
                                notifications.filter((notification) => notification.read === 'false').length > 0
                                    ?
                                    <Badge
                                        badgeContent={
                                            notifications.filter((notification) => notification.read === 'false').length
                                        }
                                        color="secondary"
                                    >
                                        <NotificationsIcon />
                                    </Badge>

                                    : (<NotificationsIcon />)
                                : <NotificationsIcon />

                        }
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onEntered={onMenuOpened}
                >
                    {
                        notifications && notifications.length > 0 ? (
                            notifications.map((not) => {
                                const verb = not.type === 'like' ? 'liked' : 'commented on';
                                const time = dayjs(not.createdAt).fromNow();
                                const iconColor = not.read ? 'primary' : 'secondary';
                                const icon =
                                    not.type === 'like' ? (
                                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                                    ) : (
                                            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                                        );

                                return (
                                    <MenuItem key={not.createdAt} onClick={handleClose}>
                                        {icon}
                                        <Typography
                                            component={Link}
                                            color="default"
                                            variant="body1"
                                            to={`/users/${not.recipient}/scream/${not.screamId}`}
                                        >
                                            {not.sender} {verb} your scream {time}
                                        </Typography>
                                    </MenuItem>
                                );
                            })
                        ) : (
                                <MenuItem onClick={handleClose}>
                                    You have no notifications yet
                                </MenuItem>
                            )
                    }
                </Menu>
            </Fragment>
        </div>
    )
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

export default connect(
    mapStateToProps,
    { markNotificationsRead }
)(Notifications);