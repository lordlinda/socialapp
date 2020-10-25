import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LIKE_SCREAM, UNLIKE_SCREAM } from './types'

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return {
                initialState
            }
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                ...action.payload
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId

                    }
                ]
            }
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.screamId !== action.payload.screamId
                )
            }
        default:
            return state
    }
}