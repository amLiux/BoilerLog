import React from 'react'
import { useDispatch } from 'react-redux';
import { removeCitaActiva } from '../../../../actions/citas';
import { clearPacientes, setPacienteActivo } from '../../../../actions/pacientes';
import { setModalActivo, setModalInactivo } from '../../../../actions/ui';
import { Button } from '../../Button';
import { Input } from '../../Input'

export const FormNoPaciente = ({ handleInputChange, errors, values, handleReset, handleSubmit }) => {
    const { nombre, apellido, email, numeroTelefonico } = values;

    const dispatch = useDispatch();

    const handleAddPacienteClick = () => {
        // se desactiva el modal calendario
        dispatch(setModalInactivo());
        // se remueve la cita para evitar bugs
        dispatch(removeCitaActiva());
        dispatch(clearPacientes());
        delete values.estado;
        delete values._id;
        // setteamos un paciente para que cuando se abra el modal ya tenga los valores que tenemos hasta el momento en él
        dispatch(setPacienteActivo({ ...values }));
        dispatch(setModalActivo('PACIENTES'));
    }

    return (
        <>
            <div className="edit-form__form-container-title">
                <h2><i className="fas fa-edit"></i>Editar cita:</h2>
            </div>
            <div className="edit-form__form">
                <Input handleInputChange={handleInputChange} placeholder="Nombre" errors={errors} type="text" value={nombre} name="nombre" />
                <Input handleInputChange={handleInputChange} placeholder="Apellido" errors={errors} type="text" value={apellido} name="apellido" />
                <Input handleInputChange={handleInputChange} placeholder="Nombre" errors={errors} type="text" value={email} name="email" />
                <Input handleInputChange={handleInputChange} placeholder="Nombre" errors={errors} type="text" value={numeroTelefonico} name="numeroTelefonico" />
            </div>
            <div style={{ width: '80%' }} className="edit-form__action-bar-group">
                <Button onClick={e => handleReset(e)} warning={true} text={'Cancelar cambios'} group={true} />
                <Button onClick={handleSubmit} text="Guardar" group={true} />
            </div>
            <span onClick={e => handleAddPacienteClick(e)} className="link link-err mb-5">
                Este cliente todavía no es un paciente, click aquí para agregarlo.
            </span>
        </>
    )
}
