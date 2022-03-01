import React from 'react'

import {useDispatch} from 'react-redux'
import { setToastInactivo } from '../../actions/ui'

export const Toast = ({ mensaje, exitoso}) => {

    const dispatch = useDispatch()

    return (
        <div className="wrapper">
            <div className={`toast ${exitoso && 'toast-success'}`}>
                <div className="content">
                    <div className={`icon ${exitoso && 'icon-success'}`} >
                        {exitoso 
                            ? <i className="fas fa-check"></i>
                            : <i className="fas fa-exclamation"></i> 
                        }
                    </div>
                    <div className="details">
                        <span>{ exitoso ? 'Completado!' : 'Error!'}</span>
                        <p>{mensaje}</p>
                    </div>
                </div>
                <div onClick={() => dispatch(setToastInactivo())} className="close-icon"><i className="fas fa-times"></i></div>
            </div>
        </div>

    )
}
