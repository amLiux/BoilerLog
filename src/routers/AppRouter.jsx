import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { JournalScreen } from '../components/screens/JournalScreen'
import { AuthRouter } from './AuthRouter'
import {firebase} from '../firebase/firebase.config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { Spinner } from '../components/ui/Spinner'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { ScheduleScreen } from '../components/screens/ScheduleScreen'

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [logged, setLogged] = useState(false)



    useEffect(()=> {
        firebase.auth().onAuthStateChanged( (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setLogged(true)
            }
            else{
                setLogged(false)
            }
            setTimeout(() => {
                setChecking(false)
            }, 3000);
        })
    }, [dispatch, setChecking, setLogged])



    if (checking){
        return(
            <div style={{display: 'flex', height: '100vh', alignItems: 'center'}}>
                    <Spinner size="big"/>
            </div>
        )
    }
        
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" isAuthenticated={logged} component={AuthRouter}/>
                    <PublicRoute path="/public/schedule" isAuthenticated={logged} component={ScheduleScreen}/>
                    <PrivateRoute exact path="/" isAuthenticated={logged} component={JournalScreen} />
                </Switch>
            </div>
        </Router>
    )
}
