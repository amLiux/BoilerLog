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

	const { isCitaActive, cita } = useSelector(state => state.citas);
	const { contextoToast, toastAbierto } = useSelector(state => state.ui);

	useEffect(() =>
		citas && citas.length === 0
			? setEmpty(true)
			: setEmpty(false) && setCreate(false)
	, [citas]);

	const handleCreateScreen = () => setCreate(!create);

	return (
		<div className={`modal-background ${isModalOpen ? 'modal-showing' : ''}`}>
			{toastAbierto && <Toast mensaje={contextoToast.mensaje} exitoso={contextoToast.exito} />}
			<div className="modal-inner">
				<Sidebar handleClose={handleClose} />
				<div className="modal-form">
					{
						!empty
							? isCitaActive
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
