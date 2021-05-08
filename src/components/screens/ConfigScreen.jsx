import React from 'react'
// import { Link } from 'react-router-dom'
import { Checkbox } from '../ui/Checkbox'
import { Input } from '../ui/Input'

export const ConfigScreen = () => {

    const config = JSON.parse(localStorage.getItem('config')) || {
        citasCanceladasEnCalendario: false,
        citasCompletadasEnCalendario: false,
        datosEnHomeMensuales: false
    }

    const handleCitasCanceladas = () => {
        localStorage.setItem('config', JSON.stringify({...config, citasCanceladasEnCalendario: !config.citasCanceladasEnCalendario}))
    }

    const handleDatosHome = () => {
        localStorage.setItem('config', JSON.stringify({...config, datosEnHomeMensuales: !config.datosEnHomeMensuales}))
    }

    const handleCitasCompletadas = () => {
        localStorage.setItem('config', JSON.stringify({...config, citasCompletadasEnCalendario: !config.citasCompletadasEnCalendario}))
    }


    return (
        <div className="main-container">
            <div style={{display: 'flex', width: '50%', margin: '0 auto', flexDirection:'column', height: '100%' }}>
                    <div className="mt-10" style={{marginBottom: 'auto'}}>
                        <Checkbox 
                            handleCheck={handleCitasCanceladas}
                            checked={config.citasCanceladasEnCalendario}
                            setting="¿Quieres que aparezcan las citas canceladas en el calendario?"
                            helpMessage="No las vas a borrar del sistema, solo no van a aparecer en tu calendario."
                        />
                        <Checkbox 
                            handleCheck={handleCitasCompletadas}
                            checked={config.citasCompletadasEnCalendario}
                            setting="¿Quieres que aparezcan las citas completadas en el calendario?"
                            helpMessage="No las vas a borrar del sistema, solo no van a aparecer en tu calendario."
                        />
                        <Checkbox 
                            handleCheck={handleDatosHome}
                            checked={config.datosEnHomeMensuales}
                            setting="¿Quieres que los datos de 'Home' sean semanales o mensuales?"
                            helpMessage="Esto depende de la forma en la que quieras ver la pantalla 'Home'."
                        />
                        <div className="mt-10" style={{ display:'flex', justifyContent:'space-around'}}>
                            <h5>Quieres reiniciar tu contraseña?</h5>
                            <Input name="newPwd" placeholder="Escribe aqui tu nueva contraseña..." type="password" errors={{}}/>
                        </div>  
                    </div>

                    <div>
                        <div className="mt-10 mb-5" style={{width: '100%', textAlign: 'center'}}>
                            <a href="/mypadre" style={{textAlign: 'center', width: '100%'}}>Manual de usuario</a>
                        </div>
                        <div className="mb-10" style={{width: '100%', textAlign: 'center'}}>
                            <a href="/mypadre" style={{textAlign: 'center', width: '100%'}}>Acerca del sistema</a>
                        </div>
                    </div>
            </div>
        </div>
        
    )
}
