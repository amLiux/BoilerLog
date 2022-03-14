import React from 'react';
import { ErrorHelpProps } from '../../constants/propTypes';

export const ErrorHelp = ({isAuth=false, message}) => (
	<p className={`${message === 'Confirmar tu contraseña es requerido' ? 'mb-10' : 'mb-5'} auth__input-help  ${!isAuth ? 'edit' : ''}`}>{message}</p>
);

ErrorHelp.propTypes = ErrorHelpProps;