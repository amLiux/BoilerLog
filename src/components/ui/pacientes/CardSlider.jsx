import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPatientAppointments } from '../../../actions/patients';
import { usePagination } from '../../hooks/usePagination';
import { CitasCard } from './CitasCard';

export const CardSlider = ({paciente: {_id}}) => {

	const dispatch = useDispatch();
	const { patientAppointments } = useSelector(state => state.pacientes);

	const [currentCita, currentPage , handleChangePage, maxPage] =  usePagination(patientAppointments, 1);
	
	useEffect(()=>{
		dispatch(startLoadingPatientAppointments(_id));
	}, [_id, dispatch]);

	return (
		<>
			{ patientAppointments.length <= 0 ?
				<>
					<i className="fas fa-info-circle"><span> No hay citas para este paciente </span></i>
				</>
				: 
				<>
					{
						patientAppointments.length !== 1 && currentPage !== 1 && <i onClick={()=> handleChangePage('back')} className="fas fa-arrow-left"></i>
					}
					
					<CitasCard cita={currentCita}/>
					
					{
						patientAppointments.length !== 1 && currentPage !== maxPage && <i onClick={()=> handleChangePage('next')}  className="fas fa-arrow-right"></i>
					}
				</>
			}
		</>
	);
};
