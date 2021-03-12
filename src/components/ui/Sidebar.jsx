import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch()

    const {name} = useSelector(state => state.auth);

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(startLogout())
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-user"></i>
                    <span> {name}</span>
                </h3>
                <button onClick={handleLogout} className="btn btn-white mt-5">
                    Logout
                </button>
            </div>

            <div className="journal__new-entry mt-10">
                <i className="fas fa-calendar-plus"></i>
                <p>New entry</p>
            </div>


            <JournalEntries />

        </aside>
    )
}
