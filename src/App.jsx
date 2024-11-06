import './App.css';
import Navbar from './assets/components/navbar';
import Lembretes from './assets/components/lembretes';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './assets/pages/dashboard';
import Configurações from './assets/pages/configurações';
import Agenda from './assets/pages/agenda';
import Clientes from './assets/pages/clientes';
import PagLembretes from './assets/pages/pagLembretes';

function App() {

  return (
    <Router>
      <>
        <Navbar/>
        <div id="barra_lembretes">
          <Lembretes></Lembretes>
        </div>
      </>

      <div className="main-content"> {/* Área para o conteúdo das rotas */}
          <Routes>
            <Route path="/pagLembretes" element={<PagLembretes></PagLembretes>} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/configurações" element={<Configurações />} />
          </Routes>
        </div>
    </Router>

  )
}

export default App
