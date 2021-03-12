
import React from 'react'

import {NoteAppBar} from './NoteAppBar'

export const NoteEditor = () => {
    return (
        <div className="notes__main-content" >
            <NoteAppBar/>
            <div className="notes__content">
                <input type="text" className="notes__input-title" placeholder="Title" />
                <textarea className="notes__input-textarea" placeholder="What happened today?"></textarea>
                <div className="notes__image">
                    <img src="https://wallpaperaccess.com/thumb/1881953.png" alt="...img"/>
                </div>
            </div>
        </div>
    )
}
