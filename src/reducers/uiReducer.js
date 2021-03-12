import {types} from '../types/types'

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state=initialState, action) =>{
    switch (action.type) {
        case types.uiStartLoad: 
            return {
                ...state,
                loading: true
            }

        case types.uiStopLoad: 
            return {
                ...state,
                loading: false
            }
    
        default:
            return state;
    }
}