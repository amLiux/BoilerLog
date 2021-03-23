import React from 'react'

export const Input = ({hidden=false, type, handleInputChange, errors, value, name, placeholder}) => {
    return (
        <input 
            className={`auth__input ${name === 'email' && 'mt-5'} ${errors[`${name}`] ? 'auth__input-hasError' : 'mb-5'}`} 
            name={name}
            autoComplete="off" 
            type={type}  
            placeholder={placeholder} 
            value={value} 
            onChange={handleInputChange} 
            />
    )
}
