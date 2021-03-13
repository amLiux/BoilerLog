import React from 'react'
import { Button } from '../ui/Button'
import { RadioButton } from '../ui/RadioButton'

export const ScheduleScreen = ({name="Marcelo", fecha="25/3/2021"}) => {
    return (
        <div className="schedule__main">
            <div className="schedule__box-container">
                <h3 className="auth__title mb-5">Hola {name}!</h3>
                <h3 className="auth__subtitle mb-10">Estos son los espacios disponibles el día {fecha}:</h3>
                <RadioButton label="Hora"/>
                <RadioButton label="Hora"/>
                <RadioButton label="Hora"/>
                <div style={{display: 'flex', justifyContent: 'space-around', paddingTop: '10px'}}>
                    <Button group={true} warning={true} text="Cambiar fecha" />
                    <Button group={true} text="Agendar" />
                </div>
            </div>
        </div>
    )
}
