import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/dataActions';
import { IconButton, Tooltip } from '@material-ui/core';
function LikeButton(props) {
    const { authenticated } = props.user;
    const likedScream = () => {
        if (
            props.user.likes &&
            props.user.likes.find(
                (like) => like.screamId === props.screamId
            )
        )
            return true;
        else return false;
    };

    const likeScream = () => {
        props.likeScream(props.screamId)
    };
    const unlikeScream = () => {
        props.unlikeScream(props.screamId)
    };

    return (
        <div>
            {
                !authenticated ? (
                    <Link to="/login">
                        <Tooltip title='Like'>
                            <IconButton>
                                <FavoriteBorder color="primary" fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </Link>
                ) : likedScream() ? (
                    <Tooltip title='undo like'>
                        <IconButton onClick={unlikeScream}>
                            <FavoriteIcon color="primary" fontSize='small' />
                        </IconButton>
                    </Tooltip>

                ) : (
                            <Tooltip title='like'>
                                <IconButton tip="Like" onClick={likeScream}>
                                    <FavoriteBorder color="primary" fontSize='small' />
                                </IconButton>
                            </Tooltip>

                        )
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(LikeButton);