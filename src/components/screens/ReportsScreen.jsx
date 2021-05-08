import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { BarChart } from '../ui/reports/BarChart'
import { SelectReport } from '../ui/reports/SelectReport'

export const ReportsScreen = () => {

    const [reporte, setReporte] = useState('')
    const [desde, setDesde] = useState('')
    const [hasta, setHasta] = useState('')

    const handleMonthInput = ({target}) => {
        const [year, month] = target.value.split('-')

        const dateToSet = new Date(year,  month - 1)
        target.name === 'desde' 
            ? setDesde(dateToSet) 
            : (dateToSet) > desde && setHasta(dateToSet)
    }

    const activeReporte = useRef(reporte)


    useEffect(()=> {
        if(activeReporte?.current !== reporte){
            activeReporte.current = reporte
            setDesde('')
            setHasta('')
        }
    }, [reporte])

    return (
        <div className="main-container">
            <div className="mt-5" style={{display: 'flex', alignItems: 'center'}}>    
                <div style={{marginLeft: '4rem', flex: '0 0 30%'}}>
                    <SelectReport handleState={setReporte} />
                </div>
                {
                    reporte &&
                        <>
                            <form style={{display:'flex', flex: '0 0 40%', justifyContent:'space-between', marginRight: '1rem'}}>
                                <div style={{marginRight: '2rem'}}>
                                    <label style={{fontWeight: '500'}} htmlFor="start">Desde:</label>
                                    <Input name="desde" handleInputChange={handleMonthInput} errors={{}} type="month" placeholder="El mes" />
                                </div>
                                {
                                    desde &&
                                        <div>
                                            <label style={{fontWeight: '500'}} htmlFor="start">Hasta:</label>
                                            <Input name="hasta" handleInputChange={handleMonthInput} errors={{}} type="month" />
                                        </div>
                                }
                            </form>
                            {
                                desde && hasta &&
                                    <div style={{marginRight: 'auto', marginLeft: '4rem', flex: '0 0 30%'}}>
                                        <Button text="Descargar reporte" group={true}/>
                                    </div>
                            }

                        </>
                }

            </div>
            {
                reporte && desde && hasta &&
                    <div style={{display: 'flex'}}>
                        <BarChart desde={desde} hasta={hasta} reporte={reporte}/>
                    </div>
            }

        </div>
    )
}
