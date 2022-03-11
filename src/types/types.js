export const types = {

	uiOpenModal: '[UI] Open modal',
	uiCloseModal: '[UI] Close modal',
	uiShowToast: '[UI] Open toast',
	uiRemoveToast: '[UI] Close toast',
	uiSetDiaActivo: '[UI] Set clicked day',
	uiRemoveDiaActivo: '[UI] Remove current day',

	citasSetCitaActiva: '[Citas] Set active cita',
	citasRemoveCitaActiva: '[Citas] Remove active cita',
	citasUpdateCitaActiva: '[Citas] Update active cita',
	citasSetCitas: '[Citas] Set all citas',
	citasActualizarCitas: '[Citas] Set updated citas',
	citasLimpiarCitas : '[Citas] Remove citas',
	citasAgregarCita: '[Citas] Add cita',
	citasCancelarCita: '[Citas] Cancel cita',
	
	patientsAddPatient: '[Patients] Add new patient',
	patientsSetPatients: '[Patients] Set all patients',
	patientsUpdatePatient: '[Patients] Set updated patients', 
	patientsSetActivePatient: '[Patients] Set active patient',
	patientsRemoveActivePatient: '[Patients] Remove active patient',
	patientsSetPatientAppointments: '[Patients] Set citas of specific patient',
	patientsSetPatientFiles: '[Patients] Set archivos of specific patient',
	patientsClearPatients: '[Patients] Remove patients',

	usersSetUsers: '[Users] Set all pacientes',
	
	horariosSetHorario: '[Horarios] Set selected horario',
	
	authCheckingFinished: '[Auth] Finished checking JWT state',
	authLogin: '[Auth] Login',
	logout: '[Auth] Logout',

};