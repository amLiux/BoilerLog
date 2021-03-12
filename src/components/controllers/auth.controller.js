export const areInputsValid = ({email, name, pwd, confPwd}) => {
    let errs = {}
    
    if (email.trim().length === 0)  errs.email = 'El correo es requerido'
    if (!/\S+@\S+\.\S+/.test(email))  errs.email = 'El correo es inválido'
    if (name.trim().length === 0)  errs.name = 'Escribe un nombre válido'
    if (pwd.trim().length === 0) errs.pwd ='Escribe una contraseña válida'
    if (confPwd.trim().length === 0) errs.confPwd ='Confirmar tu contraseña es requerido'

    if (pwd !== confPwd) errs.pwdMatchError = 'Las contraseñas deberían de ser iguales'

    return errs
}

export const areLoginInputsValid = ({email, pwd}) => {

    let errs = {}
    
    if (email.trim().length === 0)  errs.email = 'El correo es requerido'
    if (!/\S+@\S+\.\S+/.test(email))  errs.email = 'El correo es inválido'
    if (pwd.trim().length === 0) errs.pwd ='Escribe una contraseña válida'



    return errs
}

