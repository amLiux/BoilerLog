import React from 'react'
import {Link} from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import {useDispatch} from 'react-redux'
import { startLogin } from '../../actions/auth'
import { Spinner } from '../ui/Spinner'
import {areLoginInputsValid} from '../controllers/auth.controller'
import { Input } from '../ui/Input'
import { ErrorHelp } from '../ui/ErrorHelp'

export const LoginScreen = () => {

    const dispatch = useDispatch()
    const handleLogin = () => dispatch(startLogin(formValues))

    const [formValues, handleInputChange, handleSubmit, errors, submitting] = useForm({
        email: '',
        pwd: ''
    }, areLoginInputsValid, handleLogin)

    const {email, pwd} = formValues

    return (
        <>

            <h3 className="auth__title mb-5">Ingresá <i className="fas fa-sign-in-alt"></i></h3>
            {
                submitting && <Spinner />
            }
            <form onSubmit={handleSubmit}>
                <Input handleInputChange={handleInputChange} placeholder="Email" errors={errors} type="email" value={email}  name="email"/>
                {
                    errors.email && (<ErrorHelp message={errors.email} />)
                }
                
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Contraseña" type="password" value={pwd} name="pwd"/>
                {
                    errors.pwd && (<ErrorHelp message={errors.pwd} />)
                }
                <button disabled={submitting} className="btn btn__primary btn__block pointer mb-5" type="submit">Login</button>
            </form>
            <Link className="link" to="/auth/register">Crea una cuenta!</Link>
        </>
    )
}
