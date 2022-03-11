import {types} from '../types/types';

export const setModalActivo = (tipoModal) => ({
	type: types.uiOpenModal,
	payload: tipoModal
});

export const setToastActivo = (mensaje, exito) => ({
	type: types.uiShowToast,
	payload: {
		mensaje,
		exito
	}
});

export const setToastInactivo = () => ({type: types.uiRemoveToast});

export const setModalInactivo = () => ({type: types.uiCloseModal});

export const setDiaActivo = (dia) => ({
	type: types.uiSetDiaActivo,
	payload:{
		...dia
	}
});

export const removeDiaActivo = () => ({type: types.uiRemoveDiaActivo});

