import { useState, useEffect } from 'react'
// import {  generateUser } from '../../services/generateUsername'
export const useForm = ( initialState = {}, validate, callback, errorCallback ) => {

    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [userCheck, setUserCheck] = useState(false)


    useEffect(() => {
        if(Object.keys(errors).length > 0 && isSubmitting){
            setIsSubmitting(false)
        }

        if(Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }

    }    
    , [errors, isSubmitting, callback, errorCallback])    

    const handleSubmit = (e) => {
        e && e.preventDefault()
        setErrors(validate(values))
        setIsSubmitting(true)
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }

    return [ values, handleInputChange, handleSubmit, errors, userCheck, setUserCheck ]

}