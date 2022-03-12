import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { CalendarScreen } from '../components/screens/CalendarScreen';
import { CitasScreen } from '../components/screens/CitasScreen';
import { ConfigScreen } from '../components/screens/ConfigScreen';
import { HomeScreen } from '../components/screens/HomeScreen';
import { PacientesScreen } from '../components/screens/PacientesScreen';
import { CalendarModal } from '../components/ui/calendar/CalendarModal/CalendarModal';
import { Navbar } from '../components/ui/Navbar';
import { closeModal, removeActiveDay, removeToast } from '../actions/ui';
import { removeActiveAppointment } from '../actions/appointments';
import { PacientesModal } from '../components/ui/pacientes/PacientesModal';
import { removeActivePatient } from '../actions/patients';
import { ReportsScreen } from '../components/screens/ReportsScreen';
import { UserManagementScreen } from '../components/screens/UserManagementScreen';
import { Toast } from '../components/ui/Toast';


export const DashboardRoutes = () => {

	const { isModalOpen, activeDay, modalType } = useSelector(state => state.ui);

	const dispatch = useDispatch();

	const { toastContext, isToastOpen } = useSelector(state => state.ui);

	const handleCloseCalendar = () => {
		dispatch(closeModal());
		dispatch(removeActiveDay());
		dispatch(removeActiveAppointment());
		dispatch(removeToast());
	};

	const handleClosePacientes = () => {
		dispatch(closeModal());
		dispatch(removeActivePatient());
		dispatch(removeToast());
	};

	return (
		<div className="main">
			<Navbar />
			{isModalOpen && Object.keys(activeDay).length !== 0 && modalType === 'CALENDARIO' && <CalendarModal dia={activeDay} handleClose={() => handleCloseCalendar()} isModalOpen={isModalOpen} />}
			{isModalOpen && modalType === 'PACIENTES' && <PacientesModal handleClose={() => handleClosePacientes()} modalAbierto={isModalOpen} />}
			<div className="main__main-content">
				{isToastOpen && <Toast success={toastContext.success} msg={toastContext.msg} />}
				<Switch>
					<Route exact path="/dentaltask/" component={HomeScreen} />
					<Route exact path="/dentaltask/calendario" component={CalendarScreen} />
					<Route exact path="/dentaltask/citas" component={CitasScreen} />
					<Route exact path="/dentaltask/pacientes" component={PacientesScreen} />
					<Route exact path="/dentaltask/reportes" component={ReportsScreen} />\
					<Route exact path="/dentaltask/usuarios" component={UserManagementScreen} />
					<Route exact path="/dentaltask/configuracion" component={ConfigScreen} />
				</Switch>
			</div>
		</div>
	);
};
