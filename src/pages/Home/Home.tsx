import React from 'react';
import BasicLayout from '../../layout/BasicLayout';
import './Home.scss';

interface IProps{
  setRefreshCheckLogin: (bool: boolean) => void;
}

const Home = (props: IProps) => {
  const { setRefreshCheckLogin } = props;
  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div>Home</div>
    </BasicLayout>
  );
}

export default Home;