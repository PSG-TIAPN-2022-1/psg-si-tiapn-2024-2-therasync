import { useState, useEffect } from 'react'; 
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './assets/components/navbar';
import Lembretes from './assets/components/lembretes';
import Dashboard from './assets/pages/dashboard';
import Configurações from './assets/pages/configurações';
import Agenda from './assets/pages/agenda';
import Clientes from './assets/pages/clientes';
import Login from './assets/pages/login';
import Consultas from './assets/pages/consultas';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('isAuthenticated')) ?? true
  );
  const validateToken = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      console.log('Token ta dando como falso');
      return;
    }
    // Fazendo uma requisição ao backend para validar o token
    try {
      const response = await fetch('http://localhost:3000/api/validate', {
        method: 'GET',
        headers: {
          'x-access-token': token,  // Envia o token no cabeçalho
        },
      });
      setIsAuthenticated(response.ok); // Define com base no status da resposta
    } catch (error) {
      console.error('Erro ao validar o token:', error);
      setIsAuthenticated(false);  // Se der erro na requisição, desautentica
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove o token ao fazer logout
    setIsAuthenticated(false);  // Atualiza o estado de autenticação
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
          <Route path="/consultas" element={isAuthenticated ? <Consultas/> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
