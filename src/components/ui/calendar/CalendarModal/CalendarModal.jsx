import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Toast } from '../../Toast';
import { Banner } from './Banner';
import { CitaForm } from './CitaForm';
import { EditCita } from './EditCita';
import { Sidebar } from './Sidebar';

export const CalendarModal = ({ dia, isModalOpen, handleClose }) => {
	const { appointments } = dia;
	const [empty, setEmpty] = useState();
	const [create, setCreate] = useState(false);

	const { hasActiveAppointment, appointment } = useSelector(state => state.appointments);
	const { toastContext, isToastOpen } = useSelector(state => state.ui);

	useEffect(() =>
		appointments && appointments.length === 0
			? setEmpty(true)
			: setEmpty(false) && setCreate(false)
	, [appointments]);

	const handleCreateScreen = () => setCreate(!create);

	return (
		<div className={`modal-background ${isModalOpen ? 'modal-showing' : ''}`}>
			{isToastOpen && <Toast msg={toastContext.msg} success={toastContext.success} />}
			<div className="modal-inner">
				<Sidebar handleClose={handleClose} />
				<div className="modal-form">
					{
						!empty
							? hasActiveAppointment
								? <EditCita isEdit cita={appointment} />
								: create
									? <CitaForm callback={handleCreateScreen} />
									: <Banner handleCreateScreen={handleCreateScreen} simpleBanner />
							: 
							<>
								{
									create
										? <CitaForm callback={handleCreateScreen} />
										: <Banner handleCreateScreen={handleCreateScreen} />
								}
							</>
					}
				</div>
			</div>
		</div>
	);
};
