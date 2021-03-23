import { fetchPutCitas, fetchGetCitas } from '../services/fetch'
import {types} from '../types/types'
import { setDiaActivo, setToastActivo } from './ui'

export const setCitaActiva = (cita) => ({
    type: types.citasSetCitaActiva,
    payload: {
        ...cita
    }
})

export const removeCitaActiva = (cita) => ({type: types.citasRemoveCitaActiva})

export const startUpdateCita = (cita) => {
    return async (dispatch, getState) => {

        const {diaActivo} = getState().ui

        diaActivo.citas = diaActivo.citas.map(
            v => v._id === cita._id
            ? cita
            : v
        )

        console.log(diaActivo)

        const token = localStorage.getItem('token')
        const resp = await fetchPutCitas(token, cita)
        const body = await resp.json()

        if(body?.ok){
            dispatch(setToastActivo(body.msg))
            dispatch(refreshCitas(cita))
            dispatch(setDiaActivo(diaActivo))
        }
        
    }
}

const refreshCitas = (cita) => ({
    type: types.citasActualizarCitas,
    payload: cita
})

export const clearCitas = () => ({type: types.citasLimpiarCitas})

export const startLoadingCitas = () =>{
    return async dispatch => {
        const token = localStorage.getItem('token')

        const response = await fetchGetCitas(token)
        const {citas} = await response.json()

        citas.length > 0 ? dispatch(setCitas(citas)) : dispatch(setCitas([]))
    }
}

export const setCitas = (citas) => ({
    type: types.citasSetCitas,
    payload:{
        citas: [...citas]
    }
})
