import React from 'react'

export const NoteAppBar = () => {
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>
            <div className="btn-group">
                <button className="btn btn-appbar">Archivo</button>
                <button className="btn btn-appbar">Guardar</button>
            </div>
        </div>
    )
}
