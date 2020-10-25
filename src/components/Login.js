import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { loginUser } from '../redux/userActions'

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '10px auto'
    },
    textField: {
        margin: '10px auto'
    },
    button: {
        marginTop: '20px',
        position: 'relative'
    },
    customError: {
        marginTop: '10px',
        color: 'red'
    },
    progress: {
        position: 'absolute'
    }
}


function Login(props) {
    const { classes, UI: { loading } } = props

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errors: null
    })
    const { email, password, errors } = formData

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }
        props.loginUser(userData, props.history)

    }
    useEffect(() => {
        setFormData({
            ...formData,
            errors: props.UI.errors
        })
    }, [props.UI.errors])
    return (
        <div>
            <Grid
                className={classes.form}
                container>
                <Grid item sm></Grid>
                <Grid item sm>
                    <Typography variant='h2' className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField id='email'
                            type='email'
                            name='email'
                            label='Email'
                            className={classes.textField}
                            value={email}
                            onChange={handleChange}
                            helperText={errors?.email}
                            error={errors?.email ? true : false}
                            fullWidth />
                        <TextField id='password'
                            type='password'
                            name='password'
                            label='Password'
                            className={classes.textField}
                            value={password}
                            onChange={handleChange} fullWidth
                            helperText={errors?.password}
                            error={errors?.password ? true : false} />
                        {errors?.error && (
                            <Typography vriant='body2'
                                className={classes.customError}>{errors?.error}</Typography>
                        )}
                        <Button variant="contained" color="primary"
                            type='submit'
                            className={classes.button}
                            disabled={loading}>
                            Login
                            {
                                loading && (<CircularProgress className={classes.progress} />
                                )
                            }
                        </Button>
                        <br />
                        <small>dont have an account <Link to='/signup'>Signup</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        </div>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        UI: state.UI
    }
}
export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login))
