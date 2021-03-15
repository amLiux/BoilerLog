import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CalendarScreen } from '../components/screens/CalendarScreen'
import { CitasScreen } from '../components/screens/CitasScreen'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <div className="main">
            <Navbar/>
            <div className="main__main-content">
                <Switch>
                    <Route exact path="/dentaltask/calendario" component={CalendarScreen} />
                    <Route exact path="/dentaltask/citas" component={CitasScreen} />
                </Switch>
            </div>
        </div>
    )
}
