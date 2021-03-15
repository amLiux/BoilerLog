import React, {useState, useEffect} from 'react'
import {fetchGetCitas} from '../../services/fetch'
import { CalendarHeader } from '../ui/calendar/CalendarHeader'
import { Dia } from '../ui/calendar/Dia'

export const CalendarScreen = () => {


    const [nav, setNav] = useState(0)
    const [dias, setDias] = useState([])
    const [dateDisplay, setDateDisplay] = useState('')
    const [clicked, setClicked] = useState(false)
    const [citas, setCitas] = useState([])

    const token = localStorage.getItem('token')
    const citasPorDia = (diaActual) => 
        citas.filter( cita => new Date(cita.fechaDeseada).toDateString() === new Date(diaActual).toDateString() && cita )

    useEffect(() => {
        async function fetchData() {
            const response = await fetchGetCitas(token)
            const {citas} = await response.json()

            citas.length > 0 ? setCitas(citas) : setCitas([])
        }
        fetchData()
    }, [token]);

    useEffect(()=>{
        const capitalizar = word => word.charAt(0).toUpperCase() + word.slice(1)
        const semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

        const fecha = new Date()
        nav !== 0 && fecha.setMonth(new Date().getMonth() + nav)
        
        const 
            dia = fecha.getDate(),
            mes = fecha.getMonth(),
            anho = fecha.getFullYear()
    
        const primerDiaDelMes = new Date(anho, mes, 1)
        const diasEnMes = new Date(anho, mes + 1, 0).getDate()
        const dateString = primerDiaDelMes.toLocaleDateString('es-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
    

        const nombreDelPrimerDia = capitalizar(dateString.split(', ')[0])
        const diasComodinInicio = semana.indexOf(nombreDelPrimerDia)

        setDateDisplay(`${capitalizar(fecha.toLocaleDateString('es', {month:'long'}))} ${anho}`)

        const daysArr = []

        for(let i = 1; i<=diasComodinInicio + diasEnMes; i++){
            const diaActual = `${mes+1}/${i - diasComodinInicio}/${anho}`
            if(i > diasComodinInicio){
                daysArr.push({
                    value: i - diasComodinInicio,
                    event: citasPorDia(diaActual),
                    esHoy: diaActual.split('/')[1] === dia.toString() && nav === 0 ? true : false,
                    date: diaActual
                })
            }else{
                daysArr.push({
                    value: 'padding',
                    event: null,
                    esHoy: false,
                    date: ''
                })
            }
        }

        setDias(daysArr)

    }, [citas, nav])

    console.log(citas)
    return (
        <div className="calendar">
            <CalendarHeader setNav={setNav}/>
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
                {dias.map((day, i) => 
                    <Dia 
                        key={i} 
                        day={day} 
                        onClick={()=> day.value !== 'padding' && setClicked(day.date)}/>)
                }
            </div>
        </div>
    )
}
