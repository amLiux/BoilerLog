import {types} from '../types/types'
import { fetchLogin, fetchValidateJWT } from '../services/fetch'
import { setToastActivo, setToastInactivo } from './ui'


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
        const resp = await fetchLogin(user, pwd);
        const {ok, payload, msg = ''} = await resp.json();
        
        if(ok){
            localStorage.setItem('token', payload.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(setToastInactivo());
            dispatch(login(payload.uid, payload.user, payload.rol));
        }else{
            dispatch(setToastActivo(msg, ok));
        }
        
    }
}


export const startLogout = () => {
    return async (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')

        dispatch(logout())
    }
}

export const logout = () => ({type: types.logout})


export const startChecking = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const resp = await fetchValidateJWT(token)
        const {ok, payload} = await resp.json()

        if(ok){
            localStorage.setItem('token', payload.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login(payload.uid, payload.name, payload.rol))
        }else{
            dispatch(checkingFinished())
        }

    }
}

export const checkingFinished = () => ({type: types.authCheckingFinished})