import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../Button';
import { SelectHorario } from './SelectHorario';
import { SelectPaciente } from './SelectPacientes';
import { startAddingAppointment } from '../../../../actions/appointments';
import { sendToast } from '../../../../actions/ui';


export const CitaForm = ({ callback }) => {
	const dispatch = useDispatch();

	const [horario, setHorario] = useState('');
	const [paciente, setPaciente] = useState({});

	const handleSaveClick = () => {
		const existeHorario = horario !== '';
		const existeUsuario = (Object.keys(paciente).length !== 0 && paciente.constructor === Object);

		(existeHorario && existeUsuario)
			? dispatch(startAddingAppointment(paciente, horario))
			: dispatch(sendToast('Necesitas llenar los 2 valores', false));
	
		callback();
	};

	return (
		<div className="edit-form__box-container create">
			<div className="edit-form__action-bar">
			</div>
			<form className="edit-form__form-container">
				<div className="edit-form__form-container-title">
					<h2><i className="fas fa-edit"></i>Crear cita:</h2>
				</div>
				<SelectPaciente handleState={setPaciente} />
				<SelectHorario handleState={setHorario} />
				<div className="edit-form__action-bar-group">
					<Button onClick={(e) => handleSaveClick(e)} text="Guardar" />
				</div>
			</form>
		</div>
	);
};
