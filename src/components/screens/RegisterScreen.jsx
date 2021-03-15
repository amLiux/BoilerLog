import React, { useCallback } from 'react'
import {Link} from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { areInputsValid } from '../controllers/auth.controller'
import { useDispatch } from 'react-redux'
import { startRegularRegister } from '../../actions/auth'
import { Input } from '../ui/Input'
import { ErrorHelp } from '../ui/ErrorHelp'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { generateUser } from '../../services/generateUsername'

export const RegisterScreen = () => {
                 
    const dispatch = useDispatch()

    
    const handleRegister = () => dispatch(startRegularRegister(values))
    
    const [values, handleInputChange, handleSubmit, errors, userCheck, setUserCheck] = useForm({
        email: '',
        user: '',
        name: '',
        lastName: '',
        pwd: '',
        confPwd: '',
    }, areInputsValid, handleRegister)
    
    const handleCheck = useCallback(() => setUserCheck(!userCheck), [userCheck, setUserCheck])

    let {email, pwd, confPwd, name, lastName, user} = values
    
    return (
        <>
            <h3 className="auth__title mb-5">Crea tu cuenta <i className="fas fa-user-plus"></i></h3>
            <form onSubmit={handleSubmit}>
                <Input handleInputChange={handleInputChange} placeholder="Email" errors={errors} type="email" value={email}  name="email"/>
                {
                    errors.email && (<ErrorHelp message={errors.email} />)
                }
                {
                    !userCheck 
                        ? <Input handleInputChange={handleInputChange} placeholder="Usuario" errors={errors} type="text" value={user}  name="user"/>
                        : <Input 
                            handleInputChange={handleInputChange} 
                            placeholder="Usuario" 
                            errors={errors} 
                            hidden={true} 
                            type="text" 
                            value={generateUser(name, lastName)} 
                            name="user"/>
                }
                {
                    !userCheck && errors.user && (<ErrorHelp message={errors.user} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Nombre" type="text" value={name} name="name"/>
                {
                    errors.name && (<ErrorHelp message={errors.name} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Apellido" type="text" value={lastName} name="lastName"/>
                {
                    errors.lastName && (<ErrorHelp message={errors.lastName} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Contraseña" type="password" value={pwd} name="pwd"/>
                {
                    errors.pwd && (<ErrorHelp message={errors.pwd} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Confirma tu contraseña" type="password" value={confPwd} name="confPwd"/>
                {
                    errors.confPwd && (<ErrorHelp message={errors.confPwd} />)
                }
                {/* TODO check how to use this to assign generateUser response to values.user */}
                <Checkbox handleCheck={handleCheck} />
                <Button text="Registrar"/>
            </form>
            <Link className="link" to="/auth/login">Ya estás registrado?</Link>
        </>
    )
}
