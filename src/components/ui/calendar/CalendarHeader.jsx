import React from 'react'
import { Button } from '../Button'

export const CalendarHeader = () => {
    return (
        <div id="header" className="calendar__header">
            <Button group={true} text={<i className="fas fa-arrow-left"></i>}/>
            <div className="mb-5">Marzo</div>
            <Button group={true} text={<i className="fas fa-arrow-right"></i>}/>
        </div>
    )
}
