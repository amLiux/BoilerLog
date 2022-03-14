import React from 'react';
import { Link } from 'react-router-dom';
import { UpdateAppointmentFormProps } from '../../../../constants/propTypes';
import { Button } from '../../Button';
import { SelectSchedule } from './SelectSchedule';

export const UpdateAppointmentForm = ({ values, setSchedule, handleDelete, handleSubmit }) => {

	const { nombre, apellido } = values;

	return (
		<>
			<div className="edit-form__form-container-title">
				<h2><i className="fas fa-user-clock"></i> Editar horario:</h2>
			</div>
			<div className="edit-form__form-container-header">
				<div>
					<h2 style={{ fontSize: '1.6rem' }}>{nombre} {apellido}</h2>
					<Link to="#" className="link link-suc mb-5">Paciente <i className="fas fa-check"></i> </Link>
				</div>
				<span>
					&#8592; Puedes encontrar el horario actual de la cita de {nombre} en la barra de la izquierda.
				</span>
			</div>
			<SelectSchedule handleState={setSchedule} />
			<div style={{ width: '80%' }} className="edit-form__action-bar-group">
				<Button onClick={e => handleDelete(e)} warning={true} text={'Cancelar cita'} group={true} />
				<Button onClick={handleSubmit} text="Guardar" group={true} />
				{/* TODO cambiar este onClick por completarCita */}
				<Button success={true} onClick={handleSubmit} text="Completar cita" group={true} />
			</div>
		</>
	);
};

UpdateAppointmentForm.propTypes = UpdateAppointmentFormProps;