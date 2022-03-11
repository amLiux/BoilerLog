import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchGetHorariosByDate } from '../../../../services/processRequest';

export const SelectHorario = ({ handleState }) => {

	const { date } = useSelector(state => state.ui.diaActivo);

	const [horarios, setHorarios] = useState([]);
	const [dropdownActive, setDropdownActive] = useState(false);
	const [placeholder, setPlaceholder] = useState('Seleccione el horario');

	useEffect(() => {
		// estaba recibiendo este error https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component y le agregue el flag isMounted, al parecer evita memory leaks por re-renders del useEffect
		let isMounted = true;
		async function fetchHorariosDisponibles() {
			const token = localStorage.getItem('token');
			const response = await fetchGetHorariosByDate(date, token);
			const { horariosDisponibles } = await response.json();
			horariosDisponibles.sort((a, b) => a - b);
			if (isMounted) setHorarios(horariosDisponibles);
		}
		fetchHorariosDisponibles();
		return () => { isMounted = false;};
	}, [date]);


	const handleOptionClick = (horario, stringHorario) => {
		setDropdownActive(!dropdownActive);
		setPlaceholder(stringHorario);
		const date2 = new Date(date);
		date2.setHours(horario);
		handleState(date2);
	};

	const createHorario = (hora) => `${hora}:00 - ${hora + 1}:00`;

	return (
		<div style={{ width: '70%' }} className="select__box">
			<div className={`select__box__placeholder ${dropdownActive && 'active'}`}>
				{placeholder}
				<i onClick={() => setDropdownActive(!dropdownActive)} className="fas fa-caret-square-down"></i>
			</div>
			<div className={`select__box-options ${dropdownActive && 'active'}`}>
				{
					horarios.map(
						(horario) => (
							<div key={horario} onClick={() => handleOptionClick(horario, createHorario(horario))} className="select__box-option">
								<input type="radio" className="select__box-radio" id={horario} name={horario} />
								<label htmlFor={horario}>{createHorario(horario)}</label>
							</div>
						)
					)
				}
			</div>
		</div>
	);
};
