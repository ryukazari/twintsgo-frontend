import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';
import LogoTwintsgo from '../../assets/png/original.png';
import LogoTwintsgoWhite from '../../assets/png/original_blanco.png';
import BasicModal from '../../components/Modal/BasicModal';
import RegisterForm from '../../components/RegistroForm';
import LoginForm from '../../components/LoginForm';
import './Login.scss';

interface IPropsRight{
    openModal: (content: React.ReactElement) => void;
    setShowModal: (bool: boolean) => void;
    setRefreshCheckLogin: (bool: boolean) => void;
}

interface IProps{
    setRefreshCheckLogin: (bool: boolean) => void;
}

const LeftComponent = () => {
    return(
        <Col className="Login__left" xs={6}>
            <img src={LogoTwintsgo} alt="Twintsgo"/>
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} />
                    Sigue lo que te interesa.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUsers} />
                    Enterate de que está hablando la gente.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment} />
                    Únete a la conversación.
                </h2>
            </div>
        </Col>
    )
}

const RightComponent = (props: IPropsRight) => {
    const { openModal, setShowModal, setRefreshCheckLogin } = props;
    return(
        <Col className="Login__right" xs={6}>
            <div>
                <img src={LogoTwintsgoWhite} alt=""/>
                <h2>Mira lo que está pasando en el mundo en este momento</h2>
                <h3>Únete a TwintsGO hoy mismo.</h3>
                <Button 
                variant="primary" 
                onClick={() => openModal(<RegisterForm setShowModal={setShowModal} />)}
                >
                    Regístrate 
                </Button>
                <Button 
                variant="outline-primary"
                onClick={() => openModal(<LoginForm setRefreshCheckLogin={setRefreshCheckLogin} />)}
                >
                    Iniciar sesión 
                </Button>
            </div>
        </Col>
    )
}

const Login = (props: IProps) => {
    const { setRefreshCheckLogin } = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const openModal = (content: any) => {
        setShowModal(true);
        setContentModal(content);
    }
  return (
    <>
        <Container className="Login" fluid>
            <Row>
                <LeftComponent/>
                <RightComponent
                openModal = {openModal}
                setShowModal = {setShowModal}
                setRefreshCheckLogin = {setRefreshCheckLogin}
                />
            </Row>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal}>
            <div>
                <h2>
                    {contentModal}
                </h2>
            </div>
        </BasicModal>
    </>
  )
}

export default Login;
