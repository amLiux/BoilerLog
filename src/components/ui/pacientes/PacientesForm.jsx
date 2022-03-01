import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startAddingPaciente, startUpdatePaciente, setPacienteActivo } from '../../../actions/pacientes'
import { arePacienteInputsValid } from '../../controllers/pacientes.controller'
import { useForm } from '../../hooks/useForm'
import { Button } from '../Button'
import { InputGroup } from '../InputGroup'

export const PacientesForm = ({ handleClose, isEdit }) => {

    const dispatch = useDispatch();

    let formState;

    const { pacienteActivo } = useSelector(state => state.pacientes);
    const activePaciente = useRef(pacienteActivo?._id);

    // si el form se renderiza desde el CalendarModal o se edita algun paciente existente ya tiene unos valores, pero si se intenta crear un paciente queremos un form limpio
    pacienteActivo ? formState = pacienteActivo : formState = {
        nombre: '',
        apellido: '',
        cedula: '',
        email: '',
        numeroTelefonico: ''
    };

    const handleSaveClick = () =>
        isEdit
            ? dispatch(startUpdatePaciente(values))
            : dispatch(startAddingPaciente(values));


    const [values, handleInputChange, handleSubmit, errors, reset] = useForm(formState, arePacienteInputsValid, handleSaveClick);

    let { nombre, apellido, email, numeroTelefonico, cedula } = values;

    useEffect(() => {
        if (activePaciente?.current !== pacienteActivo?._id) {
            reset({ ...pacienteActivo });
            activePaciente.current = pacienteActivo?._id;
        }
    }, [pacienteActivo, reset]);

    useEffect(() => {
        dispatch(setPacienteActivo(values));
    }, [values, dispatch])

    return (
        <div className={`edit-form__box-container ${isEdit ? 'edit' : ''} `}>
            <div className={`edit-form__action-bar ${isEdit ? 'edit' : ''} `}>
                <div className="edit-form__action-bar-group">
                    {
                        handleClose &&
                        <div onClick={handleClose} className="edit-form__action-bar-item">
                            <i className="far fa-window-close"></i>
                        </div>
                    }
                    <div className="edit-form__action-bar-item">
                        <span>{isEdit ? 'Editar Paciente:' : 'Crear Paciente:'}</span>
                    </div>
                </div>

            </div>
            <form className={`edit-form__form-container ${isEdit ? 'edit' : ''}`}>
                <InputGroup
                    isEdit={nombre !== ''}
                    name="nombre"
                    label="Nombre"
                    handleInputChange={handleInputChange}
                    value={nombre} />
                <InputGroup
                    isEdit={apellido !== ''}
                    name="apellido"
                    label="Apellido"
                    handleInputChange={handleInputChange}
                    value={apellido} />
                <InputGroup
                    isEdit={!cedula}
                    name="cedula"
                    label="Cédula"
                    handleInputChange={handleInputChange}
                    value={cedula} />
                <InputGroup
                    isEdit={email !== ''}
                    name="email"
                    handleInputChange={handleInputChange}
                    value={email}
                    label="Email" />
                <InputGroup
                    isEdit={numeroTelefonico !== ''}
                    name="numeroTelefonico"
                    handleInputChange={handleInputChange}
                    value={numeroTelefonico}
                    label="Número telefónico" />
                <div className="edit-form__action-bar-group">
                    <Button onClick={handleSubmit} text="Guardar" />
                </div>
            </form>
        </div>
    )
}
