import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { clearCitas } from '../../actions/citas'

export const Navbar = () => {

    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(clearCitas())
        dispatch(startLogout())
    }

    return (
        <nav className="nav">
            <ul className="nav__links">
                <li>
                    <NavLink 
                        activeClassName="nav__links-active"
                        exact={true}
                        to="/dentaltask"
                    >
                        <i className="fas fa-home"></i>
                        <span className="icon-text"> Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="nav__links-active"
                        to="/dentaltask/calendario"
                    >
                        <i className="far fa-calendar-alt"></i>
                        <span className="icon-text"> Calendario</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="nav__links-active"
                        to="/dentaltask/pacientes"
                    >
                        <i className="fas fa-user-injured"></i>
                        <span className="icon-text"> Pacientes</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="nav__links-active"
                        to="/dentaltask/configuracion"
                    >
                        <i className="fas fa-cogs"></i>
                        <span className="icon-text"> Configuración</span>
                    </NavLink>
                </li>
                <button className="btn btn__primary" onClick={handleLogout}>Cerrar sesión</button>
            </ul>
        </nav>
    )
}