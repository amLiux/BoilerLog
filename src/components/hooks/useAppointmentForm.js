import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveAppointment, startCancelingAppointment, startUpdatingAppointment } from '../../actions/appointments';
import { areCitaInputsValid } from '../controllers/citas.controller';
import { useForm } from './useForm';

export const useAppointmentForm = (appointment) => {
	const dispatch = useDispatch();

	const [isPatient, setIsPatient] = useState(true);
	const [schedule, setSchedule] = useState('');

	const citaAntesDeCambios = useRef(appointment);

	const handleUpdate = () => {
		// si existe un horario quiere decir que ya existe un paciente y lo único que podemos actualizar es dicho horario
		if (schedule !== '') {
			const update = appointment.estado === 'PENDIENTE'
				? { ...appointment, estado: 'AGENDADA', fechaDeseada: new Date(schedule).toISOString() }
				: { ...appointment, fechaDeseada: new Date(schedule).toISOString() };
			dispatch(startUpdatingAppointment(update));
		} else {
			// sino podemos actualizar literalmente cualquier valor que esté en nuestro cliente (que todavía no es paciente)
			dispatch(startUpdatingAppointment(values));
		}
	};

	const handleReset = (e) => {
		e.preventDefault();
		if (citaAntesDeCambios !== appointment)
			reset({ ...citaAntesDeCambios.current });
	};

	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(startCancelingAppointment(appointment));
	};

	const [values, handleInputChange, handleSubmit, errors, reset] = useForm({ ...appointment }, areCitaInputsValid, handleUpdate);

	const activeCita = useRef(appointment._id);

	useEffect(() => {
		setIsPatient(Object.prototype.hasOwnProperty.call(appointment, 'idPaciente'));
		if (activeCita.current !== appointment._id) {
			citaAntesDeCambios.current = appointment;
			reset({ ...appointment });
			activeCita.current = appointment._id;
		}

	}, [appointment, reset]);

	useEffect(() => {
		dispatch(setActiveAppointment(values));
	}, [values, dispatch]);

	return [isPatient, setSchedule, handleDelete, handleSubmit, values, handleInputChange, errors, handleReset];
};