import React from 'react';
import { Modal } from 'react-bootstrap';
import LogoTwintsgoWhite from '../../../assets/png/original_blanco.png'
import './BasicModal.scss';

interface IProps{
  show: boolean;
  setShow: (bool: boolean) => void;
  children: React.ReactNode;
}

const BasicModal = (props: IProps) => {
  const { show, setShow, children } = props;

  return (
    <Modal
    className="basic-modal"
    show={show}
    onHide={() => setShow(false)}
    centered
    size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <img src={LogoTwintsgoWhite} alt="TwintsGO"/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default BasicModal;