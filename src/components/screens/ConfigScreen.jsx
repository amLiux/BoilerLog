import React from 'react'
import { Checkbox } from '../ui/Checkbox'

export const ConfigScreen = () => {
    return (
        <div className="main-container">
            <div className="mt-10">
                <Checkbox setting="¿Quieres que aparezcan las citas canceladas en el calendario?"/>
                <Checkbox setting="¿Quieres que aparezcan las citas completadas en el calendario?"/>
                <Checkbox setting="¿Quieres que los datos de 'Home' sean semanales o mensuales?"/>
            </div>
            
        </div>
    )
}
