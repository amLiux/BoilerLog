import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { CalendarScreen } from '../components/screens/CalendarScreen'
import { CitasScreen } from '../components/screens/CitasScreen'
import { ConfigScreen } from '../components/screens/ConfigScreen'
import { HomeScreen } from '../components/screens/HomeScreen'
import { PacientesScreen } from '../components/screens/PacientesScreen'
import { Modal } from '../components/ui/calendar/Modal'
import { Navbar } from '../components/ui/Navbar'
import {setModalInactivo, removeDiaActivo} from '../actions/ui'
import {removeCitaActiva} from '../actions/citas'


export const DashboardRoutes = () => {

    const {modalAbierto, diaActivo} = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setModalInactivo())
        dispatch(removeDiaActivo())
        dispatch(removeCitaActiva())
    }


    return (
        <div className="main">
            <Navbar/>
            { modalAbierto && Object.keys(diaActivo).length !== 0 && <Modal dia={diaActivo} handleClose={()=> handleClose()} modalAbierto={modalAbierto} /> }
            <div className="main__main-content">
                <Switch>
                    <Route exact path="/dentaltask/" component={HomeScreen} />
                    <Route exact path="/dentaltask/calendario" component={CalendarScreen} />
                    <Route exact path="/dentaltask/citas" component={CitasScreen} />
                    <Route exact path="/dentaltask/configuracion" component={ConfigScreen} />
                    <Route exact path="/dentaltask/pacientes" component={PacientesScreen} />
                </Switch>
            </div>
        </div>
    )
}
