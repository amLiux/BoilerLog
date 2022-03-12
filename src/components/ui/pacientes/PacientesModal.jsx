import React from 'react';
import { useSelector } from 'react-redux';
import { Toast } from '../Toast';
import { PacientesForm } from './PacientesForm';

export const PacientesModal = ({ isModalOpen, handleClose }) => {

	const { toastContext, isToastOpen } = useSelector(state => state.ui);

	return (
		<div className={`modal-background ${isModalOpen ? 'modal-showing' : ''}`}>
			{isToastOpen && <Toast msg={toastContext.msg} success={toastContext.success} />}
			<div className="modal-inner d-flex">
				<div className="modal-form">
					<PacientesForm handleClose={handleClose} />
				</div>
			</div>
		</div>
	);
};
