import {types} from '../types/types'

const initialState = {
    isCitaActive: false,
    cita: {},
    totalCitas: []
}

export const citasReducer = (state=initialState, action) =>{
    switch (action.type) {
        case types.citasSetCitaActiva:
            return {
                ...state,
                cita: action.payload,
                isCitaActive: true
            }

        case types.citasRemoveCitaActiva:
            return {
                ...state,
                cita: {},
                isCitaActive: false
            }
        
        case types.citasUpdateCitaActiva:
            return {
                ...state,
                cita: action.payload,
            }
        
        case types.citasSetCitas:
            return {
                ...state,
                totalCitas: action.payload.citas
            }
            
        case types.citasLimpiarCitas:{
            return {
                isCitaActive: false,
                cita: {},
                totalCitas: []
            }
        }

        case types.citasActualizarCitas:{
            return {
                ...state,
                totalCitas: state.totalCitas.map(
                    cita => cita._id === action.payload._id
                    ? action.payload
                    : cita
                )
            }
        }
        
        default:
            return state;
    }
}