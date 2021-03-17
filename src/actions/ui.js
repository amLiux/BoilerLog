import {types} from '../types/types'

export const setModalActivo = () => ({type: types.uiOpenModal})

export const setModalInactivo = () => ({type: types.uiCloseModal})

export const setDiaActivo = (dia) => ({
    type: types.uiSetDiaActivo,
    payload:{
        dia
    }
})

