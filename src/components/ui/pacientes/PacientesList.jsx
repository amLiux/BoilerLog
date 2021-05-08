import React from 'react'
import { useDispatch } from 'react-redux'
import { setPacienteActivo } from '../../../actions/pacientes'

export const PacientesList = ({pacientes}) => {

    const dispatch = useDispatch()

    const handlePacienteClick = (paciente) => {
        dispatch(setPacienteActivo(paciente))
    }
    
    return (
        <div className="list">
            <ul>
                {
                    pacientes.map( 
                        paciente =>  (
                            <li key={paciente._id} onClick={()=> handlePacienteClick(paciente)} >
                                <span>{paciente.nombre}</span>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}
