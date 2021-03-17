import React, {useState, useEffect} from 'react'
import {fetchGetCitas} from '../../services/fetch'
import { useCalendar } from '../hooks/useCalendar'
import { CalendarHeader } from '../ui/calendar/CalendarHeader'
import { Dia } from '../ui/calendar/Dia'
import { useDispatch } from 'react-redux'
import { setDiaActivo, setModalActivo } from '../../actions/ui'

export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const [nav, setNav] = useState(0)
    const [citas, setCitas] = useState([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        async function fetchData() {
            const response = await fetchGetCitas(token)
            const {citas} = await response.json()

            console.log(citas)

            citas.length > 0 ? setCitas(citas) : setCitas([])
        }
        fetchData()
    }, [token]);

    const [dias, dateDisplay] = useCalendar(citas, nav)

    const handleDiaClick = (dia) => {
        if(dia.value !== 'padding'){
            dispatch(setModalActivo())
            dispatch(setDiaActivo(dia))
        }
    }

    return (
        <div className="calendar">
            <CalendarHeader onNext={()=> setNav(nav + 1)} onBack={()=> setNav(nav - 1)} dateDisplay={dateDisplay} />
            <div className="calendar__weekdays">
                <div>Domingo</div>
                <div>Lunes</div>
                <div>Martes</div>
                <div>Miércoles</div>
                <div>Jueves</div>
                <div>Viernes</div>
                <div>Sábado</div>
            </div>
            <div className="calendar__content">
                {dias.map((dia, i) => 
                    <Dia 
                        key={i} 
                        day={dia} 
                        onClick={() => handleDiaClick(dia)}/>)
                }
            </div>
        </div>
    )
}
