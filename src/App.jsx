import { useState, useEffect } from 'react'; // Importando useState e useEffect
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './assets/components/navbar';
import Lembretes from './assets/components/lembretes';
import Dashboard from './assets/pages/dashboard';
import Configurações from './assets/pages/configurações';
import Agenda from './assets/pages/agenda';
import Clientes from './assets/pages/clientes';
import PagLembretes from './assets/pages/pagLembretes';
import Login from './assets/pages/login';  // Importe o componente de login

function App() {
  // Verificar no localStorage se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'; // Retorna true ou false
  });

  // Função para fazer logout e limpar o localStorage
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <>
      {/* Verifica se o usuário está autenticado */}
      {isAuthenticated && (
        <>
          <Navbar />
          <div id="barra_lembretes">
            <Lembretes />
          </div>
        </>
      )}

      <div className="main-content">
        <Routes>
          {/* Se o usuário não estiver autenticado, redireciona para o login */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          
          {/* Redireciona para o login se não autenticado */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

          {/* Rota protegida, se não autenticado redireciona para o login */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/configurações" element={isAuthenticated ? <Configurações /> : <Navigate to="/login" />} />
          <Route path="/agenda" element={isAuthenticated ? <Agenda /> : <Navigate to="/login" />} />
          <Route path="/clientes" element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />} />
          <Route path="/pagLembretes" element={isAuthenticated ? <PagLembretes /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
