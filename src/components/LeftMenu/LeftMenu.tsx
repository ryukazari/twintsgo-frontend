import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoWhite from '../../assets/png/original_blanco.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { logoutApi } from '../../api/auth';
import './LeftMenu.scss';

interface IProps{
    setRefreshCheckLogin: (bool: boolean) => void;
}

const LeftMenu = (props: IProps) => {
    const { setRefreshCheckLogin } = props;

    const logout = () => {
        logoutApi();
        setRefreshCheckLogin(true);
    }
    
  return (
    <div className='left-menu'>
        <img className='logo' src={LogoWhite} alt='TwintsGO'/>
        <Link to='/'> 
            <FontAwesomeIcon icon={faHome} /> Inicio
        </Link>
        <Link to='/profile'> 
            <FontAwesomeIcon icon={faUser} /> Perfil
        </Link>
        <Link to='/users'> 
            <FontAwesomeIcon icon={faUsers} /> Usuarios
        </Link>
        <Link to='' onClick={logout} > 
            <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión
        </Link>
        <Button
        >
            Twinstéalo
        </Button>
    </div>
  );
}

export default LeftMenu;