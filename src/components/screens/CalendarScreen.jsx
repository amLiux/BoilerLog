import React, { useState, useEffect } from 'react'
import { useCalendar } from '../hooks/useCalendar'
import { CalendarHeader } from '../ui/calendar/CalendarHeader'
import { Dia } from '../ui/calendar/Dia'
import { useDispatch, useSelector } from 'react-redux'
import { setDiaActivo, setModalActivo } from '../../actions/ui'
import { startLoadingCitas } from '../../actions/citas'

export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const [nav, setNav] = useState(0)

    const { totalCitas } = useSelector(state => state.citas)

    const [dias, dateDisplay] = useCalendar(totalCitas, nav)

    useEffect(() => {
        dispatch(startLoadingCitas())
    }, [dispatch])


    const handleDiaClick = (dia) => {
        if (dia.value !== 'padding') {
            dispatch(setModalActivo('CALENDARIO'))
            dispatch(setDiaActivo(dia))
        }
    }

    return (
        <div className="main-container">
            <CalendarHeader onNext={() => setNav(nav + 1)} onBack={() => setNav(nav - 1)} dateDisplay={dateDisplay} />
            <div className="calendar__weekdays">
                <div>
                    <span className="fullday">Domingo</span>
                    <span className="firstLetter">D</span>
                </div>
                <div>
                    <span className="fullday">Lunes</span>
                    <span className="firstLetter">L</span>
                </div>
                <div>
                    <span className="fullday">Martes</span>
                    <span className="firstLetter">K</span>
                </div>
                <div>
                    <span className="fullday">Miercoles</span>
                    <span className="firstLetter">M</span>
                </div>
                <div>
                    <span className="fullday">Jueves</span>
                    <span className="firstLetter">J</span>
                </div>
                <div>
                    <span className="fullday">Viernes</span>
                    <span className="firstLetter">S</span>
                </div>
                <div>
                    <span className="fullday">Sabado</span>
                    <span className="firstLetter">S</span>
                </div>
            </div>
            <div className="calendar__content">
                {dias.map((dia, i, arr) => {
                    return(<Dia
                    key={i}
                    day={dia}
                    onClick={() => handleDiaClick(dia)} />)
                })
                }
            </div>
        </div>
    )
}
