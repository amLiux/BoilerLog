import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { InputGroup } from '../ui/InputGroup'
import { PacienteList } from '../ui/PacienteList'

export const PacientesScreen = () => {
    const [nav, setNav] = useState(1)

    return (
        <div className="main-container">
            <InputGroup name="busqueda" search={true}/>
            <PacienteList/>
            <div className="calendar__header mt-15">
                <Button group={true} text={<i className="fas fa-arrow-left"></i>}/>
                <div className="mb-5">{nav}</div>
                <Button group={true} text={<i className="fas fa-arrow-right"></i>}/>
            </div>
        </div>
    )
}
