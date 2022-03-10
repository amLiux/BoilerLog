import React, { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { areInputsValid } from '../controllers/auth.controller';
import { useDispatch } from 'react-redux';
import { startRegularRegister } from '../../actions/users';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { setToastActivo } from '../../actions/ui';
import { Checkbox } from '../ui/Checkbox';

export const RegisterScreen = ({isEdit}) => {
                 
    const [admin, setAdmin] = useState(false);

    const dispatch = useDispatch();

    // let formState;

    const handleRegister = () => {
        dispatch(startRegularRegister({...values, admin}));
        reset();
    };

    // isEdit ? formState = pacienteActivo : formState = {
    //     nombre: '',
    //     apellido: '',
    //     cedula: '',
    //     email: '',
    //     numeroTelefonico: ''
    // };
    
    const [values, handleInputChange, handleSubmit, errors, reset] = useForm({
        email: '',
        user: '',
        name: '',
        lastName: '',
        pwd: '',
        confPwd: '',
    }, areInputsValid, handleRegister);
        
    let {email, pwd, confPwd, name, lastName, user} = values;
    
    useEffect(() => {
        if (Object.keys(errors).length === 1 ) {
            const errorMessage = errors[Object.keys(errors)[0]];
            dispatch(setToastActivo(errorMessage, false));
        }
    }, [errors, dispatch]);

    return (
        <>
            <h3 className="auth__title mb-5">{isEdit ? 'Editar' : 'Crea una cuenta'}<i className="fas fa-user-plus"></i></h3>
            <form onSubmit={handleSubmit}>
                <Input
                    isAuthForm
                    handleInputChange={handleInputChange} 
                    placeholder="Email" 
                    errors={errors} 
                    type="email" 
                    value={email}  
                    name="email"
                />
                <Input isAuthForm handleInputChange={handleInputChange} placeholder="Usuario" errors={errors} type="text" value={user}  name="user"/>   
                <Input isAuthForm handleInputChange={handleInputChange} errors={errors} placeholder="Nombre" type="text" value={name} name="name"/>
                <Input isAuthForm handleInputChange={handleInputChange} errors={errors} placeholder="Apellido" type="text" value={lastName} name="lastName"/>
                <Input isAuthForm handleInputChange={handleInputChange} errors={errors} placeholder="Contraseña" type="password" value={pwd} name="pwd"/>
                <Input isAuthForm handleInputChange={handleInputChange} errors={errors} placeholder="Confirma la contraseña" type="password" value={confPwd} name="confPwd"/>
                <Checkbox setting="Administrador?" checked={setAdmin} handleCheck={() => setAdmin(!admin)}/>
                <Button text="Crear"/>
            </form>
        </>
    )
}
