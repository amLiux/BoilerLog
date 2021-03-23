import React, { useEffect, useRef, useState } from 'react'

export const InputGroup = ({search, value, label, handleInputChange, name}) => {

    const [disabled, setDisabled] = useState(true)

    const inputRef= useRef(null)

    useEffect(()=>{
        inputRef.current.focus()
    }, [disabled])

    const handleDisable = (e) => {
        e.preventDefault()
        setDisabled(!disabled)
    }

    return (
        <div className={`input-group ${search && 'mt-10'}`}>
            {!search && <label htmlFor={name}>{label}:</label>}
            <div className="input-group__main">
                <input 
                    placeholder={search && 'Buscar...'}
                    autoComplete="off"
                    name={name}
                    ref={inputRef} 
                    disabled={search ? !search : disabled} 
                    type="text"
                    value={value} 
                    onChange={handleInputChange}    
                />
                <button className="input-group_button" onClick={(e)=> handleDisable(e)}>
                    {
                        search 
                            ? <i class="fas fa-search"></i>
                            : disabled 
                                ? 'Editar' 
                                : 'Guardar'
                    }
                </button>
            </div>
        </div>
    )
}
