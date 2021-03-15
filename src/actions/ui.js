import {types} from '../types/types'
    
export const setError = (err) => ({type: types.uiSetErr, payload: err})

export const remError = () => ({type: types.uiRemErr})