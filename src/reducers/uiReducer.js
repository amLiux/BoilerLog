import {types} from '../types/types'

const estadoInicial = {
    modalAbierto: false,
    diaActivo: {},
    error: false,
    mensajeToast: ''
}

export const uiReducer = (state=estadoInicial, action) =>{
    switch (action.type) {
        case types.uiOpenModal: 
            return {
                ...state,
                modalAbierto: true
            }

        case types.uiCloseModal: 
            return {
                ...state,
                modalAbierto: false
            }

        case types.uiSetDiaActivo: 
            return {
                ...state,
                diaActivo: action.payload
            }
    
    
        default:
            return state;
    }
}