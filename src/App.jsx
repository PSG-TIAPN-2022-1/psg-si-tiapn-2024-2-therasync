import { useState, useEffect } from 'react'; 
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './assets/components/navbar';
import Lembretes from './assets/components/lembretes';
import Dashboard from './assets/pages/dashboard';
import Configurações from './assets/pages/configurações';
import Agenda from './assets/pages/agenda';
import Clientes from './assets/pages/clientes';
import Login from './assets/pages/login';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <Navbar />
          <div id="barra_lembretes">
            <Lembretes></Lembretes>
          </div>
        </>
      )}

      <div className="main-content">
        <Routes>
         
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/configurações" element={isAuthenticated ? <Configurações /> : <Navigate to="/login" />} />
          <Route path="/agenda" element={isAuthenticated ? <Agenda /> : <Navigate to="/login" />} />
          <Route path="/clientes" element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
