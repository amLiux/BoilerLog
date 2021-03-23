import {types} from '../types/types'
import { fetchRegister, fetchLogin, fetchValidateJWT } from '../services/fetch'
import { setToastActivo } from './ui'


// TODO manejar errores de respuestas del back-end

export const login = (uid, displayName, rol) => ({
    type: types.authLogin,
    payload: {
        uid,
        displayName,
        rol
    }
})

export const startLogin = ({user, pwd}) => {
    return async (dispatch)=> {
        const resp = await fetchLogin(user, pwd)
        const body = await resp.json()

        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login(body.uid, body.user, body.rol))
        }else{
            dispatch(setToastActivo(body.msg))
        }
        
    }
}

export const startRegularRegister = ({email, pwd, name, lastName, user}) => {
    return async (dispatch) => {
        const resp = await fetchRegister(email, pwd, name, lastName, user)
        const body = await resp.json()

        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login(body.uid, body.name))
        }else{
            const {errors} = body
            console.log(errors)
            errors 
                ? dispatch(setToastActivo(errors[Object.keys(errors)[0]].msg))
                : dispatch(setToastActivo(body.msg))
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.clear()
        dispatch(logout())
    }
}

export const logout = () => ({type: types.logout})


export const startChecking = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const resp = await fetchValidateJWT(token)
        const body = await resp.json()

        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login(body.uid, body.name, body.rol))
        }else{
            dispatch(checkingFinished())
        }

    }
}

export const checkingFinished = () => ({type: types.authCheckingFinished})