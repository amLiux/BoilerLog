import React from 'react'
import { Button } from '../Button'
import { CardSlider } from './CardSlider'

export const PacientesDashboard = ({paciente}) => {
    return (
        <div className="dashboard">
            <div className="dashboard__files">
                <h1 className="dashboard__heading"><i className="fas fa-folder-open"></i> Archivos del paciente</h1>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}} className="dashboard__main-content">

                    <div style={{width: '100%', display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

                        <div style={{width: '36.5%'}} className="btn pointer mt-1 mb-5 btn__primary">
                            <input id="file" className="dashboard__input-file" name="file" type="file" />
                            <label className="dashboard__input-label" htmlFor="file">Añadir archivo</label>
                        </div>
                        <Button warning={true} text="Eliminar Archivo" group={true}/>
                    </div>
                </div>
            </div>

            <div className="dashboard__appointments">
                <h1 className="dashboard__heading">
                    <i className="fas fa-calendar-check"></i> Citas previas
                </h1>
                <div className="dashboard__main-content">
                    <CardSlider paciente={paciente}/>
                </div>
            </div>

        </div>
    )
}
