import React from 'react'
import {Link} from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { Spinner } from '../ui/Spinner'
import { areInputsValid } from '../controllers/auth.controller'
import { useDispatch } from 'react-redux'
import { startRegularRegister } from '../../actions/auth'
import { Input } from '../ui/Input'
import { ErrorHelp } from '../ui/ErrorHelp'
import { Button } from '../ui/Button'

export const RegisterScreen = () => {
                 
    const dispatch = useDispatch()

    const handleRegister = () => dispatch(startRegularRegister(values))
    
    const [values, handleInputChange, handleSubmit, errors, submitting] = useForm({
        email: '',
        name: '',
        pwd: '',
        confPwd: ''
    }, areInputsValid, handleRegister)

    const {email, pwd, confPwd, name} = values

    return (
        <>
            <h3 className="auth__title mb-5">Crea tu cuenta <i className="fas fa-user-plus"></i></h3>
            {
                submitting && <Spinner />
            }
            {
                errors.length === 1  && <div className="auth__errorPill">{errors[0]}</div>
            }
            <form onSubmit={handleSubmit}>
                <Input handleInputChange={handleInputChange} placeholder="Email" errors={errors} type="email" value={email}  name="email"/>
                {
                    errors.email && (<ErrorHelp message={errors.email} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Nombre" type="text" value={name} name="name"/>
                {
                    errors.name && (<ErrorHelp message={errors.name} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Contraseña" type="password" value={pwd} name="pwd"/>
                {
                    errors.pwd && (<ErrorHelp message={errors.pwd} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Confirma tu contraseña" type="password" value={confPwd} name="confPwd"/>
                {
                    errors.confPwd && (<ErrorHelp message={errors.confPwd} />)
                }

                <Button text="Registrar"/>
            </form>
            <Link className="link" to="/auth/login">Ya estás registrado?</Link>
        </>
    )
}
