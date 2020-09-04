import React, { useState } from 'react';
import { Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { isEmailValid } from '../../utils/validations';
import { toast } from 'react-toastify';
import { registrarApi } from '../../api/auth';
import { IRegistroUsuario } from '../../models/registroUsuario';
import './RegistroForm.scss';

interface IProps{
    setShowModal: any;
}

const RegistroForm = (props: IProps) => {
    const { setShowModal } = props;
    const [formData, setFormData] = useState(defaultFormData());
    const [registroSpinner, setRegistroSpinner] = useState(false);

    const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let validCount: number = 0;
        values(formData).some( (value: any) => {
            value && validCount++
            return null
        });
        if (validCount !== size(formData)) {
            //Existen campos incompletos
            toast.warning("Complete todos los campos del formulario");
        } else {
            //Validar los campos
            if (!isEmailValid(formData.email)){
                toast.warning("Email inválido.");
            } else if (formData.password !== formData.repeatPassword){
                toast.warning("Las contraseñas tienen que ser iguales.");
            } else if (size(formData.password) < 8){
                toast.warning("La contraseña tiene que tener más de 8 carácteres.");
            } else {
                //Formulario válido
                setRegistroSpinner(true);
                registrarApi(formData)
                    .then(result => {
                        console.log(result);
                        if (!result.ok){
                            toast.warning(result.message)
                        } else {
                            toast.success(result.message);
                            setShowModal(false);
                            setFormData(defaultFormData());
                        }
                    })
                    .catch(() => {
                        toast.error('Error en el servidor, inténtelo más tarde.');
                    })
                    .finally(() => {
                        setRegistroSpinner(false);
                    })
            }
        }
    }

    //función para actualizar formulario que solo tenga INPUT
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

  return (
    <div className="registro-form">
        <h2>Crea tu cuenta</h2>
        <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        defaultValue={formData.name}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                        type="text"
                        placeholder="Apellidos"
                        name="lastName"
                        defaultValue={formData.lastName}
                        />
                    </Col>
                </Row> 
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="email"
                placeholder="Correo electrónico"
                name="email"
                defaultValue={formData.email}
                />
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        defaultValue={formData.password}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                        type="password"
                        placeholder="Repetir contraseña"
                        name="repeatPassword"
                        defaultValue={formData.repeatPassword}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Button variant="primary" type="submit">
                { !registroSpinner ? "Registrarse" : <Spinner animation="border" /> }
            </Button>
        </Form>
    </div>
  )
}

function defaultFormData(){
    const defaultFormData: IRegistroUsuario = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
    return defaultFormData;
}

export default RegistroForm;