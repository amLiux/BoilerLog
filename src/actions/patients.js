import { requestTemplates } from '../constants/HTTP';
import { processRequest } from '../services/processRequest'
import { types } from '../types/types';
import { startLoadingCitas } from './citas';
import { setModalInactivo, setToastActivo } from './ui';

const setPatients = (pacientes) => ({
    type: types.pacientesSetPacientes,
    payload: {
        pacientes: [...pacientes],
    }
});

const refreshPatient = (paciente) => ({
    type: types.pacientesActualizarPacientes,
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
            dispatch(setToastActivo(msg, ok));
            dispatch(setPatients(patients));
        }

    }
}

export const startAddingPatient = (patient) => {
    return async (dispatch, getState) => {
        const { totalPacientes } = getState().pacientes;

        const resp = await processRequest(requestTemplates.CREATE_USER, patient);
        const { ok, msg, payload: createdUser } = await resp.json();

        if (ok) {
            dispatch(setToastActivo(msg, ok));
            dispatch(refreshPatient(createdUser));
            dispatch(setPatients([...totalPacientes, createdUser]));
            dispatch(removeActivePatient());
            dispatch(setModalInactivo());
            dispatch(startLoadingCitas());
        } else {
            dispatch(setToastActivo(msg, ok));
        }

    }
};

export const clearPatients = () => ({ type: types.pacienteClearPacientes });

export const setPatientAppointments = (citas) => ({
    type: types.pacienteSetCitasPaciente,
    payload: citas
});

export const setPatientFiles = (archivos) => ({
    type: types.pacienteSetArchivosPaciente,
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
    }
};

export const startLoadingPatients = () => {
    return async dispatch => {
        const resp = await processRequest(requestTemplates.GET_PATIENTS);
        const { payload: patients } = await resp.json();

        patients.length > 0 ? dispatch(setPatients(patients)) : dispatch(setPatients([]));
    }
};

export const startUpdatingPatient = (paciente) => {
    return async (dispatch, getState) => {

        let { totalPacientes } = getState().pacientes;

        totalPacientes = totalPacientes.map(
            v => v._id === paciente._id
                ? paciente
                : v
        );

        const resp = await processRequest(requestTemplates.UPDATE_PATIENT, paciente);
        const { ok, msg } = await resp.json();


        if (ok) {
            dispatch(setToastActivo(msg, ok));
            dispatch(refreshPatient(paciente));
            dispatch(setPatients(totalPacientes));
        }

    }
};

export const setActivePatient = (paciente) => ({
    type: types.pacienteSetPacienteActivo,
    payload: { ...paciente }
});

export const removeActivePatient = () => ({ type: types.pacienteRemovePacienteActivo });

// TODO abstract this to its own action file
export const startLoadingPatientFiles = (patientId) => {
    return async (dispatch) => {
        const urlChangers = {
            dynamicPath: patientId
        };
        const resp = await processRequest(requestTemplates.GET_FILES, {}, urlChangers);
        const { ok, payload: { archivos } } = await resp.json();

        if (ok) {
            dispatch(setPatientFiles(archivos))
        }
    }
};

export const startUploadingFile = (file, patientId) => {
    return async (dispatch, getState) => {

        const { archivosPorPaciente } = getState().pacientes;
        const urlChangers = {
            dynamicPath: patientId
        };

        const data = new FormData();
        data.append('file', file);

        const resp = await processRequest(requestTemplates.UPLOAD_FILE, data, urlChangers);
        const { ok, msg, payload: archivo } = await resp.json();

        if (ok) {
            dispatch(setPatientFiles([...archivosPorPaciente, archivo]));
            dispatch(setToastActivo(msg, ok));
        }
    }
};

export const startDeletingFile = (fileId, fileName, patientId) => {
    return async (dispatch, getState) => {

        const urlChangers = {
            queryParams: [patientId, fileName],
        };

        const resp = await processRequest(requestTemplates.DELETE_FILE, {}, urlChangers);
        const { msg, ok } = await resp.json();

        let { archivosPorPaciente } = getState().pacientes;
        archivosPorPaciente = archivosPorPaciente.filter(v => v._id !== fileId);

        if (ok) {
            dispatch(setToastActivo(msg, ok))
            dispatch(setPatientFiles(archivosPorPaciente))
        }
    }
};

export const startDownloadingFile = (fileName, patientId) => {
    return async () => {
        const urlChangers = {
            queryParams: [patientId, fileName]
        };
        // pacienteId, fileName, token
        const resp = await processRequest(requestTemplates.DOWNLOAD_FILE, {}, urlChangers);
        const blob = await resp.blob();

        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    }
};
