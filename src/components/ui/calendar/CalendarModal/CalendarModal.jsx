import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Toast } from '../../Toast';
import { Banner } from './Banner';
import { CitaForm } from './CitaForm';
import { EditCita } from './EditCita';
import { Sidebar } from './Sidebar';

export const CalendarModal = ({ dia, isModalOpen, handleClose }) => {
	const { citas } = dia;
	const [empty, setEmpty] = useState();
	const [create, setCreate] = useState(false);

	const { hasActiveAppointment, cita } = useSelector(state => state.citas);
	const { toastContext, isToastOpen } = useSelector(state => state.ui);

	useEffect(() =>
		citas && citas.length === 0
			? setEmpty(true)
			: setEmpty(false) && setCreate(false)
	, [citas]);

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
								? <EditCita isEdit cita={cita} />
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
