import { requestTemplates } from '../constants/HTTP';
import { processRequest } from '../services/processRequest';
import { types } from '../types/types';
import { startLoadingAppointments } from './appointments';
import { closeModal, sendToast } from './ui';

const setPatients = (pacientes) => ({
	type: types.patientsSetPatients,
	payload: {
		pacientes: [...pacientes],
	}
});

const refreshPatient = (paciente) => ({
	type: types.patientsUpdatePatient,
	payload: paciente
});

export const startSearchingPatient = (searchString) => {
	return async (dispatch) => {
		const urlChangers = {
			dynamicPath: searchString,
		};

		const resp = await processRequest(requestTemplates.SEARCH_PATIENT, {}, urlChangers);
		const { ok, msg, payload: { patients } } = await resp.json();

		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(setPatients(patients));
		}

	};
};

export const startAddingPatient = (patient) => {
	return async (dispatch, getState) => {
		const { totalPacients } = getState().pacientes;

		const resp = await processRequest(requestTemplates.CREATE_USER, patient);
		const { ok, msg, payload: createdPatient } = await resp.json();

		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(refreshPatient(createdPatient));
			dispatch(setPatients([...totalPacients, createdPatient]));
			dispatch(removeActivePatient());
			dispatch(closeModal());
			dispatch(startLoadingAppointments());
		} else {
			// TODO do we need to handle any other error from API like this or should we do it on processResponse
			dispatch(sendToast(msg, ok));
		}

	};
};

export const clearPatients = () => ({ type: types.patientsClearPatients });

export const setPatientAppointments = (citas) => ({
	type: types.patientsSetPatientAppointments,
	payload: citas
});

export const setPatientFiles = (archivos) => ({
	type: types.patientsSetPatientFiles,
	payload: archivos
});

export const startLoadingPatientAppointments = (_id) => {
	return async (dispatch) => {
		const urlChangers = {
			dynamicPath: _id,
		};

		const resp = await processRequest(requestTemplates.GET_PATIENT_APPOINTMENTS, {}, urlChangers);
		const { ok, payload: { citas: appointments } } = await resp.json();

		if (ok) {
			dispatch(setPatientAppointments(appointments));
		}
	};
};

export const startLoadingPatients = () => {
	return async dispatch => {
		const resp = await processRequest(requestTemplates.GET_PATIENTS);
		const { payload: patients } = await resp.json();

		patients.length > 0 ? dispatch(setPatients(patients)) : dispatch(setPatients([]));
	};
};

export const startUpdatingPatient = (paciente) => {
	return async (dispatch, getState) => {

		let { totalPatients } = getState().pacientes;

		totalPatients = totalPatients.map(
			v => v._id === paciente._id
				? paciente
				: v
		);

		const resp = await processRequest(requestTemplates.UPDATE_PATIENT, paciente);
		const { ok, msg } = await resp.json();


		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(refreshPatient(paciente));
			dispatch(setPatients(totalPatients));
		}

	};
};

export const setActivePatient = (paciente) => ({
	type: types.patientsSetActivePatient,
	payload: { ...paciente }
});

export const removeActivePatient = () => ({ type: types.patientsRemoveActivePatient });

// TODO abstract this to its own action file
export const startLoadingPatientFiles = (patientId) => {
	return async (dispatch) => {
		const urlChangers = {
			dynamicPath: patientId
		};
		const resp = await processRequest(requestTemplates.GET_FILES, {}, urlChangers);
		const { ok, payload: { archivos } } = await resp.json();

		if (ok) {
			dispatch(setPatientFiles(archivos));
		}
	};
};

export const startUploadingFile = (file, patientId) => {
	return async (dispatch, getState) => {

		const { patientFiles } = getState().pacientes;
		const urlChangers = {
			dynamicPath: patientId
		};

		const data = new FormData();
		data.append('file', file);

		const resp = await processRequest(requestTemplates.UPLOAD_FILE, data, urlChangers);
		const { ok, msg, payload: userFile } = await resp.json();

		if (ok) {
			dispatch(setPatientFiles([...patientFiles, userFile]));
			dispatch(sendToast(msg, ok));
		}
	};
};

export const startDeletingFile = (fileId, fileName, patientId) => {
	return async (dispatch, getState) => {

		const urlChangers = {
			queryParams: [patientId, fileName],
		};

		const resp = await processRequest(requestTemplates.DELETE_FILE, {}, urlChangers);
		const { msg, ok } = await resp.json();

		let { patientFiles } = getState().pacientes;
		patientFiles = patientFiles.filter(v => v._id !== fileId);

		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(setPatientFiles(patientFiles));
		}
	};
};

export const startDownloadingFile = (fileName, patientId) => {
	return async () => {
		const urlChangers = {
			queryParams: [patientId, fileName]
		};

		const resp = await processRequest(requestTemplates.DOWNLOAD_FILE, {}, urlChangers);
		const blob = await resp.blob();

		let url = window.URL.createObjectURL(blob);
		let a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		a.click();
	};
};
