import React from 'react'
import { Spinner } from '../Spinner'
import { Sidebar } from './Sidebar'

export const Modal = ({dia, showing, handleClose}) => {
    return (
        <div className={`modal-background ${showing ? 'modal-showing' : ''}`}>
            <div className="modal-inner">
                <Sidebar dia={dia} handleClose={handleClose}/>
                <div className="modal-citas">
                    {/* TODO add EditCita tomorrow */}
                    {/* TODO check behavior if there are not any citas  */}
                    <Spinner size="big"/>
                    <h1>Escoje una cita dentro de las opciones a la izquierda!</h1>
                </div>
            </div>
        </div>
    )
}
