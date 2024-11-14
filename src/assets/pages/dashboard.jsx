// dashboard.jsx
import React, { useState } from 'react';
import '../styles/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Debitos from '../components/debitos/debitos.jsx'; 
import { Button } from 'react-bootstrap';
import Ganhos from '../components/ganhos/ganhos.jsx';
import Lucro from '../components/lucro/lucro.jsx';

const Dashboard = () => {
  const dataAtual = new Date();
  const [mes, setMes] = useState(dataAtual.getMonth());
  const [ano, setAno] = useState(dataAtual.getFullYear());
  const [periodo, setPeriodo] = useState({ mes: dataAtual.getMonth(), ano: dataAtual.getFullYear() });
  const [dadosAtualizados, setDadosAtualizados] = useState(false);

  const handleBuscar = () => {
    setPeriodo({ mes, ano });
    setDadosAtualizados(prev => !prev); // Alterna o estado para forçar atualização nos componentes filhos
  };

  return (
    <div className="container">
      <p id="titulo_container">Dashboard</p>
      <div className="container2">
        <div className="periodo-seletor">
          <div className="dataInput" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Mês:
              <select 
                value={mes} 
                onChange={(e) => setMes(parseInt(e.target.value))} 
                style={{ padding: '5px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index} value={index}>{index + 1}</option>
                ))}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Ano:
              <input
                type="number"
                value={ano}
                onChange={(e) => setAno(parseInt(e.target.value))}
                min="2000"
                max={dataAtual.getFullYear()}
                style={{ padding: '5px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </label>
          </div>
          <Button variant="warning" size='sm' onClick={handleBuscar}>
            Visualizar
          </Button>
        </div>
        <div className='MetricasTotais'>
          <Debitos mes={periodo.mes} ano={periodo.ano} dadosAtualizados={dadosAtualizados} />
          <Ganhos mes={periodo.mes} ano={periodo.ano} dadosAtualizados={dadosAtualizados} />
          <Lucro mes={periodo.mes} ano={periodo.ano} dadosAtualizados={dadosAtualizados} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
