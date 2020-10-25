import { createStore, combineReducers, applyMiddleware, } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk'
import userReducer from './userReducer'
import dataReducer from './dataReducer'
import UIReducer from './UIReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: UIReducer
})

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store