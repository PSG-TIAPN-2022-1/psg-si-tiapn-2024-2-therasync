import React, { useState, useEffect } from 'react';
import './ScrollableComponent.css'; // Importando o arquivo de estilo
import { Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ListaFluxo = () => {
  // Estado para armazenar os dados da API
  const [dataApi, setDataApi] = useState([]);
  // Estado para controlar se o botão "Ganhos" ou "Gastos" está ativo
  const [selectedButton, setSelectedButton] = useState('gastos');
  const [chartData, setChartData] = useState({});

  // Função para buscar dados de Débitos (Gastos)
  const fetchDebitos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasDebitos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      const data = await response.json();
      setDataApi(data);
      prepareChartData(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  // Função para buscar dados de Créditos (Ganhos)
  const fetchCreditos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasCreditos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      const data = await response.json();
      setDataApi(data);
      prepareChartData(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  // Função para preparar os dados do gráfico
  const prepareChartData = (data) => {
    const groupedData = data.reduce((acc, item) => {
      if (acc[item.nome]) {
        acc[item.nome] += parseFloat(item.valor);
      } else {
        acc[item.nome] = parseFloat(item.valor);
      }
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);

    setChartData({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['#FFB6C1', '#FF69B4', '#FF1493', '#C71585', '#8B008B'],
          hoverOffset: 4
        }
      ]
    });
  };

  // Função para alternar entre os dados de Ganhos e Gastos
  const handleButtonClick = (type) => {
    setSelectedButton(type);
    if (type === 'ganhos') {
      fetchCreditos();
    } else {
      fetchDebitos();
    }
  };

  // Efeito para buscar os dados de Gastos inicialmente
  useEffect(() => {
    fetchDebitos();
  }, []);

  return (
    <>
      <div className="buttons">
        <Button 
          variant="success"
          size='sm' 
          onClick={() => handleButtonClick('ganhos')} 
          active={selectedButton === 'ganhos'}
        >
          Ganhos
        </Button>
        <Button 
          variant="danger"
          size='sm' 
          onClick={() => handleButtonClick('gastos')} 
          active={selectedButton === 'gastos'}
        >
          Gastos
        </Button>
      </div>

      <div className="scrollable-container">
        <h2>{selectedButton === 'ganhos' ? 'Ganhos' : 'Gastos'}</h2>
        <p></p>

        {/* Exibindo o gráfico */}
        <div style={{ height: '300px', width: '300px', margin: 'auto' }}>
          {chartData.labels ? <Pie data={chartData} /> : <p>Carregando gráfico...</p>}
        </div>

        {/* Exibindo os dados da API */}
        <div>
          {dataApi.length > 0 ? (
            dataApi.map((item, index) => (
              <p key={index} className={selectedButton === 'ganhos' ? 'ganho' : 'gasto'}>
                {item.nome} - R${parseFloat(item.valor).toFixed(2)}
              </p>
            ))
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListaFluxo;
