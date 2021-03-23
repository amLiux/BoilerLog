import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../Spinner'
import { Toast } from '../Toast'
import { EditCita } from './EditCita'
import { Sidebar } from './Sidebar'

export const Modal = ({dia, modalAbierto, handleClose}) => {

    const {citas} = dia
    const [empty, setEmpty] = useState()
    const {mensajeToast, toastAbierto} = useSelector(state => state.ui)

    const [edit, setEdit] = useState(false)

    useEffect( () => citas.length === 0 && setEmpty(true) , [citas])
    
    const { isCitaActive, cita } = useSelector(state => state.citas)
    
    return (
        <div className={`modal-background ${modalAbierto ? 'modal-showing' : ''}`}>
            {toastAbierto && <Toast success={true} error={mensajeToast.error} />}
            <div className="modal-inner">
                <Sidebar handleClose={handleClose}/>
                <div className="modal-form">
                    {
                        !empty 
                            ?   
                                isCitaActive 
                                    ?   <EditCita cita={cita}/>
                                    :   <>
                                            <Spinner size="big"/>
                                            <h1>Escoje una cita dentro de las opciones a la izquierda!</h1>
                                        </>
                            :   <>
                                    {edit 
                                        ? <EditCita cita={{}}/>
                                        :
                                        <>
                                            <i onClick={() => setEdit(true)} className="far fa-calendar-plus"></i>
                                            <h1>Crea una cita para esta fecha.</h1>
                                        </>
                                    }

                                </>
                    }


                </div>
            </div>
        </div>
    )
}
