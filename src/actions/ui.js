import {types} from '../types/types'

export const startLoading = () => ({type: types.uiStartLoad}) 


export const stopLoading = () => ({type: types.uiStopLoad}) 
    
export const setError = (err) => ({type: types.uiSetErr, payload: err})

export const remError = () => ({type: types.uiRemErr})