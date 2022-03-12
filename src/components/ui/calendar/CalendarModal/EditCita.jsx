import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveAppointment, startCancelingAppointment, startUpdatingAppointment } from '../../../../actions/appointments';
import { areCitaInputsValid } from '../../../controllers/citas.controller';
import { useForm } from '../../../hooks/useForm';
import { FormNoPaciente } from './FormNoPaciente';
import { FormPaciente } from './FormPaciente';

export const EditCita = ({ cita }) => {

	const dispatch = useDispatch();

	// make hook, this looks awful
	const [isPaciente, setIsPaciente] = useState(true);
	const [horario, setHorario] = useState('');

	const citaAntesDeCambios = useRef(cita);

	const handleUpdate = () => {
		// si existe un horario quiere decir que ya existe un paciente y lo único que podemos actualizar es dicho horario
		if (horario !== '') {
			const update = cita.estado === 'PENDIENTE'
				? { ...cita, estado: 'AGENDADA', fechaDeseada: new Date(horario).toISOString() }
				: { ...cita, fechaDeseada: new Date(horario).toISOString() };
			dispatch(startUpdatingAppointment(update));
		} else {
			// sino podemos actualizar literalmente cualquier valor que esté en nuestro cliente (que todavía no es paciente)
			dispatch(startUpdatingAppointment(values));
		}
	};

	const handleReset = (e) => {
		e.preventDefault();
		if (citaAntesDeCambios !== cita)
			reset({ ...citaAntesDeCambios.current });
	};

	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(startCancelingAppointment(cita));
	};

	const [values, handleInputChange, handleSubmit, errors, reset] = useForm({ ...cita }, areCitaInputsValid, handleUpdate);

	const activeCita = useRef(cita._id);

	useEffect(() => {
		setIsPaciente(Object.prototype.hasOwnProperty.call(cita, 'idPaciente'));
		if (activeCita.current !== cita._id) {
			citaAntesDeCambios.current = cita;
			reset({ ...cita });
			activeCita.current = cita._id;
		}

	}, [cita, reset]);

	useEffect(() => {
		dispatch(setActiveAppointment(values));
	}, [values, dispatch]);

	return (
		<div className="edit-form__box-container create">
			<div className="edit-form__action-bar">
			</div>
			<form className="edit-form__form-container">
				{
					isPaciente
						?
						<FormPaciente
							values={values}
							setHorario={setHorario}
							handleDelete={handleDelete}
							handleSubmit={handleSubmit}
						/>
						:
						<FormNoPaciente
							handleInputChange={handleInputChange}
							errors={errors}
							values={values}
							handleReset={handleReset}
							handleSubmit={handleSubmit}
						/>
				}
			</form>
		</div>
	);
};
