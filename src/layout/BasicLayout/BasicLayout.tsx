import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftMenu from '../../components/LeftMenu';
import './BasicLayout.scss';

interface IProps{
    children: React.ReactNode;
    className: string;
    setRefreshCheckLogin: (bool: boolean) => void;
}

const BasicLayout = (props: IProps) => {
    const { children, className, setRefreshCheckLogin } = props;
  return (
      <Container className={`basic-layout ${className}`}>
          <Row>
              <Col xs={3} className="basic-layout__menu">
                  <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin}/>
              </Col>
              <Col xs={9} className="basic-layout__content">
                  {children}
              </Col>
          </Row>
      </Container>
  )
}

export default BasicLayout;