import {types} from '../types/types'

export const setModalActivo = () => ({type: types.uiOpenModal})

export const setToastActivo = (error) => ({
    type: types.uiShowToast,
    payload: {
        error
    }
})

export const setToastInactivo = () => ({type: types.uiRemoveToast})

export const setModalInactivo = () => ({type: types.uiCloseModal})

export const setDiaActivo = (dia) => ({
    type: types.uiSetDiaActivo,
    payload:{
        ...dia
    }
})

export const removeDiaActivo = () => ({type: types.uiRemoveDiaActivo})

