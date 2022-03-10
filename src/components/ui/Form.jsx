import React, { useEffect, useState } from 'react'
import { capitalizeFistLetter } from '../../services/capitalizeFirstLetter';
import { InputGroup } from './InputGroup';

export const Form = ({ values, handleInputChange, errors }) => {
    const [formValues, setFormValues] = useState([]);

    useEffect(() => {
        const notRendarableProps = ['_id', 'estado', 'fechaDeseada', 'fechaCreada', '__v', 'fechaCreado'];
        
        const newFormValues = Object.keys(values);
        const renderableProps = newFormValues.filter((formValue) => !notRendarableProps.includes(formValue))
        setFormValues(renderableProps);
    }, [values])


    return (
        <>
            {   
                    formValues.map((formValue, index) => {
                        const value = values[formValue];
                        const label = capitalizeFistLetter(formValue).match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
                        return <InputGroup
                            key={index}
                            isEdit={formValue !== '' && formValue !== undefined}
                            handleInputChange={handleInputChange}
                            errors={errors}
                            label={label}
                            value={value}
                            name={formValue}
                        />
                    })
            }
        </>
    )
}
