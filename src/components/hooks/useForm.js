import { useState, useEffect } from 'react'
export const useForm = ( initialState = {}, validate, callback, errorCallback ) => {

    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)


    useEffect(() => errors.length === 0 && isSubmitting && callback()    
    , [errors, isSubmitting, callback, errorCallback])    

    const handleSubmit = (e) => {
        e && e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setErrors(validate(values))
            setIsSubmitting(false)
        }, 2400);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }

    return [ values, handleInputChange, handleSubmit, errors, isSubmitting ]

}