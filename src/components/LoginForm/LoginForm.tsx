import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { ILoginUsuario } from '../../models/loginUsuario';
import { isEmailValid } from '../../utils/validations';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { loginApi, setTokenApi } from '../../api/auth';
import './LoginForm.scss';


interface IProps{
    setRefreshCheckLogin: (bool: boolean) => void;
}

const LoginForm = (props: IProps) => {
    const { setRefreshCheckLogin } = props;
    const [loginSpinner, setLoginSpinner] = useState(false);
    const [formData, setFormData] = useState(initialFormValue());

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
            } else {
                setLoginSpinner(true);
                loginApi(formData)
                .then(result => {
                    if (!result.ok){
                        toast.warning(result.message);
                    } else {
                        setTokenApi(result.token);
                        setRefreshCheckLogin(true);
                    }
                })
                .catch(error => {
                    toast.error('Error en el servidor, inténtelo más tarde.');
                })
                .finally(() => {
                    setLoginSpinner(false);
                })
            }
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

  return (
    <div className="login-form">
        <h2>Login</h2>
        <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group>
                <Form.Control
                type="email"
                placeholder="Correo electrónico"
                name="email"
                defaultValue={formData.email}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                defaultValue={formData.password}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                { !loginSpinner ? "Iniciar Sesión" : <Spinner animation="border" /> }
            </Button>
        </Form>
    </div>
  )
}

function initialFormValue(){
    const formDefault: ILoginUsuario = {
        email: "",
        password: ""
    }
    return formDefault;
}

export default LoginForm;