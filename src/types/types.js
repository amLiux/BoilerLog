export const types = {

	uiOpenModal: '[UI] Open modal',
	uiCloseModal: '[UI] Close modal',
	uiShowToast: '[UI] Send toast',
	uiRemoveToast: '[UI] Remove toast',
	uiSetActiveDay: '[UI] Set clicked day',
	uiRemoveActiveDay: '[UI] Remove current day',

	appointmentsSetActiveAppointment: '[Appointments] Set active appointment',
	appointmentsRemoveActiveAppointment: '[Appointments] Remove active appointment',
	appointmentsSetAppointments: '[Appointments] Set all appointments',
	appointmentsUpdateAppointments: '[Appointments] Set updated appointments',
	appointmentsRemoveAppointments : '[Appointments] Remove appointments',
	appointmentsAddAppointment: '[Appointments] Add appointment',
	
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