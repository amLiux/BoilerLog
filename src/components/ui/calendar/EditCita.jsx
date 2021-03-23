import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCitaActiva, startUpdateCita } from '../../../actions/citas'
import { areCitaInputsValid } from '../../controllers/citas.controller'
import { useForm } from '../../hooks/useForm'
import { Button } from '../Button'
import { InputGroup } from '../InputGroup'

export const EditCita = () => {

    const dispatch = useDispatch()

    const handleUpdate = () => dispatch(startUpdateCita(cita))

    const {cita} = useSelector(state => state.citas)
    const citaAntesDeCambios = useRef(cita)

    const handleReset = (e) => {
        e.preventDefault()
        if(citaAntesDeCambios !== cita)
            reset({...citaAntesDeCambios.current})
    }
    
    const [values, handleInputChange, handleSubmit, errors, reset] = useForm(
        {...cita}, 
        areCitaInputsValid, handleUpdate)
        
    let {nombre, apellido, email, numeroTelefonico } = values
    
    const activeCita = useRef(cita._id)

    useEffect(()=> {
        if(activeCita.current !== cita._id){
            citaAntesDeCambios.current = cita
            reset({...cita})
            activeCita.current = cita._id
        }
    }, [cita, reset])

    useEffect(()=>{
        dispatch(setCitaActiva(values))
    }, [values, dispatch])
    
    console.log(errors)

    return (
        <div className="edit-form__box-container">
            <div className="edit-form__action-bar">
                <div className="edit-form__action-bar-group">
                    <div className="edit-form__action-bar-item">
                        <i className="fab fa-whatsapp"></i>
                    </div>
                    <div className="edit-form__action-bar-item">
                        <i className="far fa-envelope"></i>
                    </div>
                    <div className="edit-form__action-bar-item">
                        <i className="fas fa-phone-alt"></i>
                    </div>
                </div>
            </div>
            <form className="edit-form__form-container">
                <div className="edit-form__form-container-title">
                    <h2><i className="fas fa-edit"></i>Editar cita: </h2>
                </div>
                <InputGroup 
                    name="nombre"
                    label="Nombre"
                    handleInputChange={handleInputChange} 
                    value={nombre} />
                <InputGroup 
                    name="apellido" 
                    label="Apellido"
                    handleInputChange={handleInputChange} 
                    value={apellido}/>
                <InputGroup
                    name="email" 
                    handleInputChange={handleInputChange} 
                    value={email} 
                    label="Email"/>
                <InputGroup 
                    name="numeroTelefonico"
                    handleInputChange={handleInputChange} 
                    value={numeroTelefonico} 
                    label="Número telefónico"/>


                {/* 
                    <h1>Id de la cita: {_id}</h1>
                    <h1>Estado de la cita: {estado}</h1>                
                    <h1>Fecha que se creó: {fechaCreada}</h1>
                    <h1>Fecha en la que se desea una cita: {fechaDeseada}</h1>  
                */}
                <div className="edit-form__action-bar-group">
                    <Button onClick={ e => handleReset(e) } clickable={true} warning="true" text="Cancelar" group={true}/>
                    <Button onClick={handleSubmit} clickable={true} text="Guardar" group={true}/>
                </div>
                <Link className="link link-err" to="/auth/login">Este cliente todavía no es un paciente, click aquí para agregarlo.</Link>
            </form>
        </div>
    )
}
