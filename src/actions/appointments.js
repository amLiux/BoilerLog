import { requestTemplates } from '../constants/HTTP';
import { processRequest } from '../services/processRequest';
import { types } from '../types/types';
import { setPatientAppointments } from './patients';
import { setActiveDay, sendToast } from './ui';

const setAppointments = (appointments) => ({
	type: types.appointmentsSetAppointments,
	payload: {
		appointments: [...appointments]
	}
});

const updateAppointments = (appointment) => ({
	type: types.appointmentsUpdateAppointments,
	payload: appointment
});

const addAppointment = (appointment) => ({
	type: types.appointmentsAddAppointment,
	payload: {
		...appointment
	}
});

export const setActiveAppointment = (appointment) => ({
	type: types.appointmentsSetActiveAppointment,
	payload: {
		...appointment
	}
});

export const removeActiveAppointment = () => ({ type: types.appointmentsRemoveActiveAppointment });

export const startUpdatingAppointment = (appointment) => {
	return async (dispatch, getState) => {

		const { patientAppointments } = getState().pacientes;
		const { activeDay } = getState().ui;

		const newAppointments = patientAppointments.map(
			v => v._id === appointment._id
				? appointment
				: v
		);

		if (Object.keys(activeDay).length > 0) {
			activeDay.citas = activeDay.citas.map(val => val._id === appointment._id ? appointment : val);
			dispatch(setActiveDay(activeDay));
		}

		const resp = await processRequest(requestTemplates.UPDATE_APPOINTMENT, appointment);
		const { ok, msg, payload: newAppointment } = await resp.json();

		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(updateAppointments(newAppointment));
			dispatch(setPatientAppointments(newAppointments));
			dispatch(removeActiveAppointment());
		}

	};
};

export const startCancelingAppointment = (appointment) => {
	return async (dispatch, getState) => {
		const urlChangers = {
			dynamicPath: appointment?._id
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
			dispatch(removeActiveAppointment());
			dispatch(sendToast(msg, ok));
			dispatch(updateAppointments(updatedCita));
			dispatch(setActiveDay(activeDay));
		}
	};
};

export const startAddingAppointment = (paciente, horario) => {
	return async (dispatch, getState) => {
		const resp = await processRequest(requestTemplates.CREATE_APPOINTMENT, { paciente, horario });
		const { ok, msg, payload: newAppointment } = await resp.json();

		const { activeDay } = getState().ui;

		if (ok) {
			activeDay.citas = [newAppointment, ...activeDay.citas];
			dispatch(sendToast(msg, ok));
			dispatch(addAppointment(newAppointment));
			dispatch(setActiveDay(activeDay));
		}
	};
};

export const removeAppointments = () => ({ type: types.appointmentsRemoveAppointments });

export const startLoadingAppointments = () => {
	return async dispatch => {
		const resp = await processRequest(requestTemplates.GET_APPOINTMENTS);
		const { payload: { citas: appointments } } = await resp.json();

		appointments.length > 0
			? dispatch(setAppointments(appointments))
			: dispatch(setAppointments([]));
	};
};


