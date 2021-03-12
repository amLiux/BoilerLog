import React from 'react'

export const ErrorHelp = ({message}) => (<p className={`${message === 'Confirmar tu contraseña es requerido' ? 'mb-10' : 'mb-5'} auth__input-help `}>{message}</p>)

