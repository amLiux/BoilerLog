import React from 'react'

export const Archivo = ({nombre, fecha, id}) => {

    const date = new Date(fecha)

    console.log(id)

    return (
        <div className="grid__body-item">
            <span className="col-1-of-4">{nombre}</span>
            <span className="col-1-of-4">{date.toLocaleDateString()}</span>
            <span className="col-1-of-4"><i className="fas fa-trash-alt delete"></i></span>
            <span className="col-1-of-4"><i className="fas fa-download download"></i></span>
        </div>
    )
}
