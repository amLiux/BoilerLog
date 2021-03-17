import ReduxThunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { authReducer } from '../reducers/authReducer'
import { uiReducer } from '../reducers/uiReducer'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const combinedReducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
})

export const store = createStore(
    combinedReducers,
    composeEnhancers(
        applyMiddleware(ReduxThunk)
    ))