import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_AUTHENTICATED, MARK_NOTIFICATIONS_READ } from './types'
import axios from 'axios'
export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI })
    axios.post('/login', userData)
        .then(res => {
            console.log(res.data)
            setAuthHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        }).catch(err => {
            dispatch({
                payload: err?.response?.data,
                type: SET_ERRORS
            })
        })

}
export const signupUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI })
    axios.post('/signup', userData)
        .then(res => {
            console.log(res.data)
            setAuthHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        }).catch(err => {
            dispatch({
                payload: err?.response.data,
                type: SET_ERRORS
            })
        })

}
export const getUserData = () => dispatch => {
    dispatch({ type: LOADING_USER })
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        }).catch(err => {
            console.log(err);

        })
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post('https://us-central1-socialapp-e0d9f.cloudfunctions.net/api/imageUpload', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const setAuthHeader = (token) => {
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = token
}
export const logOut = () => dispatch => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: SET_AUTHENTICATED })
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err))
};
export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios
        .post('/notifications', notificationIds)
        .then((res) => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            });
        })
        .catch((err) => console.log(err));
};