import {types} from '../types/types'
import { fetchRegister, fetchLogin, fetchValidateJWT } from '../services/fetch'


// TODO manejar errores de respuestas del back-end

export const login = (uid, displayName) => ({
    type: types.authLogin,
    payload: {
        uid,
        displayName
    }
})

export const startLogin = ({user, pwd}) => {
    return async (dispatch)=> {
        const resp = await fetchLogin(user, pwd)
        const body = await resp.json()

        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login(body.uid, body.name))
        }
        
    }
}

export const startRegularRegister = ({email, pwd, name, lastName, user}) => {
    return async (dispatch) => {
        const resp = await fetchRegister(email, pwd, name, lastName, user)
        const body = await resp.json()

        console.log(resp)

        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login(body.uid, body.name))
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
            dispatch(login(body.uid, body.name))
        }else{
            dispatch(checkingFinished())
        }

    }
}

export const checkingFinished = () => ({type: types.authCheckingFinished})