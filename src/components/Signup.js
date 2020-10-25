import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import { signupUser } from '../redux/userActions'

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

function Signup(props) {
    const { classes, UI: { loading } } = props

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        errors: null
    })
    const { email, password, errors, handle, confirmPassword } = formData
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            loading: true
        })
        const userData = {
            email,
            password,
            confirmPassword,
            handle
        }
        props.signupUser(userData, props.history)
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
                    <Typography variant='h2' className={classes.pageTitle}>Signup</Typography>
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
                        <TextField id='confirmPassword'
                            type='password'
                            name='confirmPassword'
                            label='confirmPassword'
                            className={classes.textField}
                            value={confirmPassword}
                            onChange={handleChange} fullWidth
                            helperText={errors?.confirmPassword}
                            error={errors?.confirmPassword ? true : false} />
                        <TextField id='handle'
                            type='text'
                            name='handle'
                            label='handle'
                            className={classes.textField}
                            value={handle}
                            onChange={handleChange} fullWidth
                            helperText={errors?.handle}
                            error={errors?.handle ? true : false} />
                        {errors?.error && (
                            <Typography vriant='body2'
                                className={classes.customError}>{errors?.error}</Typography>
                        )}
                        <Button variant="contained" color="primary"
                            type='submit'
                            className={classes.button}
                            disabled={loading}>
                            Signup
                            {
                                loading && (<CircularProgress className={classes.progress} />
                                )
                            }
                        </Button>
                        <br />
                        <small>already have an account <Link to='/login'>Login</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        </div>
    )
}
Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        UI: state.UI
    }
}
export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup))
