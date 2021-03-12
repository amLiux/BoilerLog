import React from 'react'
import { Sidebar } from '../ui/Sidebar';
// import {NothingSelected} from './NothingSelected'
import { NoteEditor } from '../notes/NoteEditor';
import { useSelector } from 'react-redux';
import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {

    const {active} = useSelector( state => state.notes );

    return (
        <div className="journal__main-content">
            <Sidebar/>

            <main>

                {
                    (active)
                        ? <NoteEditor/>
                        : <NothingSelected/>
                }
                 
            </main>
        </div>
    )
}
