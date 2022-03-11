import { types } from '../types/types';

const estadoInicial = {
	isModalOpen: false,
	tipoModal: '',
	activeDay: {},
	toastAbierto: false,
	mensajeToast: ''
};

export const uiReducer = (state = estadoInicial, action) => {
	switch (action.type) {
		case types.uiOpenModal:
			return {
				...state,
				isModalOpen: true,
				tipoModal: action.payload

			};

		case types.uiCloseModal:
			return {
				...state,
				isModalOpen: false
			};

		case types.uiShowToast:
			return {
				...state,
				contextoToast: action.payload,
				toastAbierto: true
			};

		case types.uiRemoveToast:
			return {
				...state,
				toastAbierto: false,
				mensajeToast: ''
			};

		case types.uiSetDiaActivo:
			return {
				...state,
				activeDay: action.payload
			};

		case types.uiRemoveDiaActivo:
			return {
				...state,
				activeDay: {}
			};

		default:
			return state;
	}
};