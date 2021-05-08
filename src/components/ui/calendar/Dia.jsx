import React from 'react'

export const Dia = ({day, onClick}) => {

    const config = JSON.parse(localStorage.getItem('config')) || {
        citasCanceladasEnCalendario: false,
        citasCompletadasEnCalendario: false,
        datosEnHomeMensuales: false
    }

    return (
        <div onClick={onClick} className={`calendar__day ${day?.esHoy ? 'calendar__day-active' : ''}`}>
            <span>{day.value !== 'padding' && day.value}</span>
            <div className="calendar__day-group">
                {day.citas?.length > 0 && 
                    day.citas.map( ({estado}, i) => {
                        if(!config.citasCanceladasEnCalendario && estado === 'CANCELADA') 
                            return 
                        else if(!config.citasCompletadasEnCalendario && estado === 'COMPLETADA') 
                            return 
                            
                            
                        return (<div className={`calendar__day-event ${estado === 'PENDIENTE_CONFIRMACION' ? 'pending' : estado === 'CANCELADA' ? 'canceled' : estado === 'COMPLETADA' ? 'complete' : ''}`} key={i} ></div>)
                    })
                }
            </div>
        </div>
    )
}
