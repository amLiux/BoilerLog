import React, { useState, useEffect } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarHeader } from '../ui/calendar/CalendarHeader';
import { Dia } from '../ui/calendar/Dia';
import { useDispatch, useSelector } from 'react-redux';
import { setDiaActivo, setModalActivo } from '../../actions/ui';
import { startLoadingAppointments } from '../../actions/citas';

export const CalendarScreen = () => {

	const dispatch = useDispatch();

	const [nav, setNav] = useState(0);

	const { totalCitas } = useSelector(state => state.citas);

	const [dias, dateDisplay] = useCalendar(totalCitas, nav);

	useEffect(() => dispatch(startLoadingAppointments()), [dispatch]);

	const handleDiaClick = (dia) => {
		if (dia.value !== 'padding') {
			dispatch(setModalActivo('CALENDARIO'));
			dispatch(setDiaActivo(dia));
		}
	};

	const weekDays = [
		{ fullDay: 'Domingo', letter: 'D' },
		{ fullDay: 'Lunes', letter: 'L' },
		{ fullDay: 'Martes', letter: 'K' },
		{ fullDay: 'Miercoles', letter: 'M' },
		{ fullDay: 'Jueves', letter: 'J' },
		{ fullDay: 'Viernes', letter: 'V' },
		{ fullDay: 'Sabado', letter: 'S' },
	];

	return (
		<div className="main-container">
			<CalendarHeader onNext={() => setNav(nav + 1)} onBack={() => setNav(nav - 1)} dateDisplay={dateDisplay} />
			<div className="calendar__weekdays">
				{
					weekDays.map(({ fullDay, letter }) =>
						<div key={letter}>
							<span className="fullday">{fullDay}</span>
							<span className="firstLetter">{letter}</span>
						</div>
					)
				}
			</div>
			<div className="calendar__content">
				{ dias.map((dia, i) => <Dia key={i} day={dia}onClick={() => handleDiaClick(dia)} />) }
			</div>
		</div>
	);
};
