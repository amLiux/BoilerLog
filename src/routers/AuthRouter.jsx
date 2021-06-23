import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen } from '../components/screens/LoginScreen'
import { Toast } from '../components/ui/Toast'

export const AuthRouter = () => {

    const {mensajeToast, toastAbierto} = useSelector(state => state.ui)
    
    return (
        <div className="auth__main">
            {toastAbierto && <Toast error={mensajeToast.error} />}
            <div className="auth__box-container">
                <Switch>
                    <Route exact path="/auth/login" component={LoginScreen}/>
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
            
        </div>
    )
}
