import React, {useState} from 'react'

export const Dia = ({day, onClick}) => {

    // const [multipleEvents, setMultipleEvents] = useState(false)

    // if(day.event?.length > 1){
    //     setMultipleEvents(true)
    // }
    return (
        <div onClick={()=> console.log(`Hola`)} className="calendar__day">
            <span>{day.value !== 'padding' && day.value}</span>
            <div className="calendar__day-group">
                {day.event?.length > 0 && 
                    day.event.map( (cita, i) => (<div className="calendar__day-event" key={i} ></div>))
                }
            </div>
        </div>
    )
}
