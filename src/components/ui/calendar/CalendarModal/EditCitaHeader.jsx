import React from 'react';
import { Link } from 'react-router-dom';

export const EditCitaHeader = ({nombre, apellido}) => {
	return (
		<div className="edit-form__form-container-header">
			<div>
				<h2 style={{fontSize:'1.6rem'}}>{nombre} {apellido}</h2>
				<Link to="#" className="link link-suc mb-5">Paciente <i className="fas fa-check"></i> </Link>
			</div>
			<span> 
				&#8592; Puedes encontrar el horario actual de la cita de {nombre} en la barra de la izquierda. 
			</span>
		</div>
	);
};
