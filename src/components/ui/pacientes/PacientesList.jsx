import React from 'react'
import { useDispatch } from 'react-redux'
import { setActivePatient } from '../../../actions/patients'

export const PacientesList = ({pacientes, style}) => {

    const dispatch = useDispatch()

    const handlePacienteClick = (paciente) => {
        dispatch(setActivePatient(paciente))
    }
    
    return (
        <div style={style} className="list">
            <ul>
                {
                    pacientes.map( 
                        paciente =>  (
                            <li key={paciente._id} onClick={()=> handlePacienteClick(paciente)} >
                                <span>{paciente.nombre} {paciente.apellido}</span>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}
