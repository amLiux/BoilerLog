import React from 'react'

export const Dia = ({day, onClick}) => {

    return (
        <div onClick={onClick} className={`calendar__day ${day?.esHoy ? 'calendar__day-active' : ''}`}>
            <span>{day.value !== 'padding' && day.value}</span>
            <div className="calendar__day-group">
                {day.citas?.length > 0 && 
                    day.citas.map( (cita, i) => (<div className="calendar__day-event" key={i} ></div>))
                }
            </div>
        </div>
    )
}
