import React from 'react'
import { RadioButton } from '../RadioButton'

export const Sidebar = ({dia, handleClose}) => {

    const {date, event} = dia.dia

    if (event?.length > 0 ){
        const date2 = new Date(event?.fechaDeseada)
        const dateString = date2.toLocaleDateString('es-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
    }

    return (
        <aside className="sidebar">
            <div onClick={handleClose} className="sidebar-navbar">
                <h1><i className="far fa-window-close"></i></h1>
                <div className="sidebar-title">
                    <p>Citas para el {date}</p>
                </div>
            </div>

            <div className="sidebar-actions mt-5">
                {
                    event?.map(cita => 
                        <RadioButton key={cita._id} id={cita._id} label={cita.nombre}/>
                    )
                }
            </div>

        </aside>
    )
}
