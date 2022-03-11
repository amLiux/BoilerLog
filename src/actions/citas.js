import { requestTemplates } from '../constants/HTTP';
import { fetchPutCitas, processRequest } from '../services/processRequest';
import { types } from '../types/types';
import { setPatientAppointments } from './patients';
import { setDiaActivo, setToastActivo } from './ui';

const setAppointments = (citas) => ({
	type: types.citasSetCitas,
	payload: {
		citas: [...citas]
	}
});

export const setCitaActiva = (cita) => ({
	type: types.citasSetCitaActiva,
	payload: {
		...cita
	}
});

export const removeCitaActiva = () => ({ type: types.citasRemoveCitaActiva });

export const startUpdateCita = (cita) => {
	return async (dispatch, getState) => {

		const { patientAppointments } = getState().pacientes;
		const { activeDay } = getState().ui;

		const newCitas = patientAppointments.map(
			v => v._id === cita._id
				? cita
				: v
		);

		if (Object.keys(activeDay).length > 0) {
			activeDay.citas = activeDay.citas.map(val => val._id === cita._id ? cita : val);
			dispatch(setDiaActivo(activeDay));
		}


		const token = localStorage.getItem('token');
		const resp = await fetchPutCitas(token, cita);
		const { ok, msg, payload: newCita } = await resp.json();
		console.log(newCita);
		if (ok) {
			dispatch(setToastActivo(msg, ok));
			dispatch(refreshCitas(newCita));
			dispatch(setPatientAppointments(newCitas));
			dispatch(cancelCita());
		}

	};
};

const refreshCitas = (cita) => ({
	type: types.citasActualizarCitas,
	payload: cita
});

const cancelCita = () => ({ type: types.citasCancelarCita });

export const startCancelingAppointment = (cita) => {
	return async (dispatch, getState) => {
		const urlChangers = {
			dynamicPath: cita?._id
		};
		const resp = await processRequest(requestTemplates.DELETE_APPOINTMENT, {}, urlChangers);
		const { ok, msg, payload: updatedCita } = await resp.json();
		const { activeDay } = getState().ui;

		// revisamos en nuestras citas del dia para cambiar la cita antigua por la actualizada
		activeDay.citas = activeDay.citas.map(
			cita => cita._id === updatedCita._id
				? updatedCita
				: cita
		);

		if (ok) {
			dispatch(cancelCita());
			dispatch(setToastActivo(msg, ok));
			dispatch(refreshCitas(updatedCita));
			dispatch(setDiaActivo(activeDay));
		}
	};
};

const agregarCita = (cita) => ({
	type: types.citasAgregarCita,
	payload: {
		...cita
	}
});


export const startAddingAppointment = (paciente, horario) => {
	return async (dispatch, getState) => {
		const resp = await processRequest(requestTemplates.CREATE_APPOINTMENT, { paciente, horario });
		const { ok, msg, payload: newAppointment } = await resp.json();

		const { activeDay } = getState().ui;

		if (ok) {
			activeDay.citas = [newAppointment, ...activeDay.citas];
			dispatch(setToastActivo(msg, ok));
			dispatch(agregarCita(newAppointment));
			dispatch(setDiaActivo(activeDay));
		}
	};
};

export const clearAppointments = () => ({ type: types.citasLimpiarCitas });

export const startLoadingAppointments = () => {
	return async dispatch => {
		const resp = await processRequest(requestTemplates.GET_APPOINTMENTS);
		const { payload: { citas: appointments } } = await resp.json();

		appointments.length > 0
			? dispatch(setAppointments(appointments))
			: dispatch(setAppointments([]));
	};
};


