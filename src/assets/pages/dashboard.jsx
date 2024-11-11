// dashboard.jsx
import React, { useState, useEffect } from 'react';
import '../styles/clientes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Debitos from '../components/debitos/debitos.jsx';  // Caminho correto para o componente

const Dashboard = () => {
  const dataAtual = new Date();
  const [mes, setMes] = useState(dataAtual.getMonth());
  const [ano, setAno] = useState(dataAtual.getFullYear());
  const [periodo, setPeriodo] = useState({ mes: dataAtual.getMonth(), ano: dataAtual.getFullYear() });
  const [dadosAtualizados, setDadosAtualizados] = useState(true);

  const handleBuscar = () => {
    setPeriodo({ mes, ano });
    setDadosAtualizados(true);
  };

  useEffect(() => {
    setDadosAtualizados(true);
  }, []);

  return (
    <div className="container">
      <p id="titulo_container">Dashboard</p>

      <div className="periodo-seletor">
        <label>
          Mês:
          <select value={mes} onChange={(e) => setMes(parseInt(e.target.value))}>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index}>{index + 1}</option>
            ))}
          </select>
        </label>
        <label>
          Ano:
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(parseInt(e.target.value))}
            min="2000"
            max={dataAtual.getFullYear()}
          />
        </label>
        <button className="btn btn-primary" onClick={handleBuscar}>
          Buscar
        </button>
      </div>

      <div>
        <Debitos mes={periodo.mes} ano={periodo.ano} dadosAtualizados={dadosAtualizados} />
      </div>
    </div>
  );
};

export default Dashboard;
