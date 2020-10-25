import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { IconButton, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { connect } from 'react-redux'
import PostScream from './PostScream';
import Notifications from './Notifications'
function Navbar(props) {
    const { authenticated } = props
    return (
        <div>
            <AppBar>
                <Toolbar className='nav__container'>
                    {authenticated ? (
                        <div className='nav__links'>
                            <PostScream />
                            <Tooltip title='Home'>
                                <IconButton >
                                    <Link to='/'>
                                        <HomeIcon />
                                    </Link>
                                </IconButton>
                            </Tooltip>
                            <Notifications />
                        </div>
                    ) : (
                            <div>
                                <Button color='inherit' component={Link} to='/login'>Login</Button>
                                <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                                <Button color='inherit' component={Link} to='/'>Home</Button>
                            </div>)}

                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
