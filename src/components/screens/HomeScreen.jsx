import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingCitas } from '../../actions/citas';
import { useHome } from '../hooks/useHome';
import { Dashboard } from '../ui/home/Dashboard'

export const HomeScreen = () => {
    const dispatch = useDispatch()
    const { totalCitas } = useSelector(state => state.citas)
    const dashboardsInfo = useHome(totalCitas)

    useEffect(() => dispatch(startLoadingCitas()), [dispatch])

    return (
        <div className="main-container main-container-home">
            <h1 style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '-3rem', fontWeight: '500', fontSize: '3rem' }}>Información importante: </h1>
            <div className="dashboard-home">
                {
                    dashboardsInfo.map(({ heading, time, text, citas }, ind) =>
                        <Dashboard key={ind} data={citas} heading={heading} time={time} text={text} />
                    )
                }
            </div>
        </div>
    )
}
