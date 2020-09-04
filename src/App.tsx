import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/context';
import { isUserLoggedApi } from './api/auth';
import Routing from './routes/Routing';

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLoggedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin])

  if(!loadUser){
    return null;
  }

  return (
    <AuthContext.Provider value={user}>
      { user ? (<Routing setRefreshCheckLogin={setRefreshCheckLogin}/>) : (<h1> <Login setRefreshCheckLogin={setRefreshCheckLogin} /> </h1>) }
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      />
    </AuthContext.Provider>
  )
}
