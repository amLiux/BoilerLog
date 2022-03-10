import React from 'react'
import { Button } from '../../Button';
import { EditCitaHeader } from './EditCitaHeader'
import { SelectHorario } from './SelectHorario'

export const FormPaciente = ({ values, setHorario, handleDelete, handleSubmit }) => {
    const { nombre, apellido } = values;
    return (
        <>
            <div className="edit-form__form-container-title">
                <h2><i className="fas fa-user-clock"></i> Editar horario:</h2>
            </div>
            <EditCitaHeader nombre={nombre} apellido={apellido} />
            <SelectHorario handleState={setHorario} />
            <div style={{ width: '80%' }} className="edit-form__action-bar-group">
                <Button onClick={ e => handleDelete(e) } warning={true} text={'Cancelar cita'} group={true} />
                <Button onClick={handleSubmit} text="Guardar" group={true} />
                {/* TODO cambiar este onClick por completarCita */}
                <Button success={true} onClick={handleSubmit} text="Completar cita" group={true} />
            </div>
        </>
    );
}
