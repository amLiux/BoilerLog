import { types } from '../types/types';

const initialState = {
	hasActiveAppointment: false,
	cita: {},
	totalAppointments: [],
};

export const appointmentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.appointmentsSetActiveAppointment:
			return {
				...state,
				cita: action.payload,
				hasActiveAppointment: true
			};

		case types.appointmentsRemoveActiveAppointment:
			return {
				...state,
				cita: {},
				hasActiveAppointment: false
			};

		case types.appointmentsSetAppointments:
			return {
				...state,
				totalAppointments: action.payload.appointments
			};

		case types.appointmentsRemoveAppointments: {
			return {
				hasActiveAppointment: false,
				cita: {},
				totalAppointments: []
			};
		}

		case types.updateAppointments: {
			return {
				...state,
				totalAppointments: state.totalAppointments.map(
					appointment => appointment._id === action.payload._id
						? action.payload
						: appointment
				)
			};
		}

		case types.appointmentsAddAppointment: {
			return {
				...state,
				totalAppointments: [...state.totalAppointments, action.payload]
			};
		}

		default:
			return state;
	}
};