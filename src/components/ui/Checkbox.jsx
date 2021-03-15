import React from 'react'

export const Checkbox = ({handleCheck}) => {
    return (
        <div className="checkbox mb-5 mt-1">
            <h5 className="mb-1" style={{textAlign: 'left', marginTop:'13px'}}>
                Quieres un usuario autogenerado?
                <br/>
                <span style={{fontSize: '11px', fontWeight:'400'}}>Te enviaremos los detalles a tu correo!</span>    
            </h5>
            <input onChange={handleCheck} type="checkbox" />
        </div>
    )
}
