import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../redux/dataActions';
const styles = {
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        margin: '10px auto'
    },
    button: {
        marginLeft: '10px',
        textTransform: 'inherit',
        borderRadius: '15px'
    },

}

function CommentForm(props) {

    const [form, setForm] = useState({
        body: '',
        errors: null
    })
    const { body, errors } = form
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitComment(props.screamId, { body });
        setForm({ ...form, body: '' })
    };
    const { classes, authenticated } = props;
    useEffect(() => {
        setForm({
            ...form,
            errors: props.UI.errors
        })
    }, [props.UI.errors])
    return (
        <div>
            {
                authenticated ? (
                    <Grid item sm={12} style={{ textAlign: 'center', marginLeft: '20px' }}>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                name="body"
                                type="text"
                                label="Comment"
                                error={errors?.comment ? true : false}
                                helperText={errors?.comment}
                                value={body}
                                onChange={handleChange}
                                fullWidth
                                className={classes.textField}
                            />
                            <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Submit
                        </Button>
                        </form>
                    </Grid>
                ) : null
            }

        </div>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});

export default connect(
    mapStateToProps,
    { submitComment }
)(withStyles(styles)(CommentForm));