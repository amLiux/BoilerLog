import {types} from '../types/types'
import {firebase} from '../firebase/firebase.config'
import Swal from 'sweetalert2'

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const logout = () => ({type: types.logout})

export const startLogin = ({email, pwd}) => {
    return (dispatch)=> {
        firebase.auth().signInWithEmailAndPassword(email, pwd)    
        .then(({user}) => dispatch(login(user.uid, user.email)))
        .catch(err => 
            err.code === 'auth/wrong-password' 
                && Swal.fire('Error!', 'Contraseña incorrecta', 'error')
        )
    }
}

export const startRegularRegister = ({email, pwd, name}) => {
    return (dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword(email, pwd)
            .then(async ({user}) => {
                await user.updateProfile({displayName: name})
                dispatch(login(user.uid, user.displayName))
            })
            .catch(err => {
                err.code === 'auth/email-already-in-use' 
                    && Swal.fire('Error!', 'Este correo electrónico ya está siendo utilizado', 'error')
            })
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
    }
}