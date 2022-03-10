import { useState, useEffect } from 'react'

export const useHome = (totalCitas) => {

    const filtrarCitas = (estado, citas, primerDiaSemana, ultimoDiaSemana, validationExtra = false) => {
        return citas.filter(cita => 
            new Date(cita.fechaDeseada) >= primerDiaSemana && 
            new Date(cita.fechaDeseada) <= ultimoDiaSemana && 
            cita.estado === estado && (validationExtra ? cita : true)
        )
    }

    const [citasSinConfirmar, setCitasSinConfirmar] = useState({
        heading: 'Citas sin confirmar',
        time: 'esta semana',
        text: 'Abajo vas a encontrar los pacientes que crearon una cita en la página web, pero no han confirmado el horario, puedes ir al módulo de Pacientes y contactar al paciente para confirmar su cita.',
        citas: []
    });

    const [citasEstaSemana, setCitasEstaSemana] = useState({
        heading:  'Citas agendadas',
        time: 'esta semana',
        text: 'Abajo puedes encontrar la fecha y el paciente de las citas actualmente agendadas. Si ves un botón de completar quiere decir que la fecha hábil de esta cita ya pasó, complétala.',
        citas: []
    });

    
    const [citasCanceladas, setCitasCanceladas] = useState({
        heading:'Citas canceladas',
        time: 'esta semana',
        text: 'Abajo vas a encontrar las citas que fueron canceladas esta semana, puedes contactar al paciente y/o doctor para reagendar de ser necesario.',
        citas: []
    });

    useEffect(() => {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();

        const primerDiaSemana = new Date(todayObj.setDate(todayDate - todayDay + 1));
        const ultimoDiaSemana = new Date(primerDiaSemana);
        ultimoDiaSemana.setDate(ultimoDiaSemana.getDate() + 5);

        setCitasSinConfirmar((state) => ({
            ...state,
            citas: filtrarCitas('PENDIENTE', totalCitas, primerDiaSemana, ultimoDiaSemana)
        }));

        setCitasCanceladas((state) => ({
            ...state,
            citas: filtrarCitas('CANCELADA', totalCitas, primerDiaSemana, ultimoDiaSemana)
        }));

        setCitasEstaSemana((state) => ({
            ...state,
            citas: filtrarCitas('AGENDADA', totalCitas, primerDiaSemana, ultimoDiaSemana, true)
        }));

    }, [totalCitas]);


    return [citasCanceladas, citasEstaSemana, citasSinConfirmar];

}