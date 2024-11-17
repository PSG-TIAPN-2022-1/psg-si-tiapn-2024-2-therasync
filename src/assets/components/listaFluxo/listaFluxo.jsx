import React, { useState, useEffect } from 'react';
import './ScrollableComponent.css';
import { Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ModalExcluirGanho from '../ModalExcluirGanho';
import ModalExcluirGasto from '../ModalExcluirGasto';
import ModalEditGanhos from '../ModalEditarGanho';
import ModalEditDebitos from '../ModalEditarGasto';

ChartJS.register(ArcElement, Tooltip, Legend);

const ListaFluxo = () => {

  const [dataApi, setDataApi] = useState([]);

  const [selectedButton, setSelectedButton] = useState('gastos');
  const [chartData, setChartData] = useState({});

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
          backgroundColor: [    '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF',
            '#FF33CC', '#FF6600', '#3366FF', '#99CC00', '#FF0000', '#00FF00',
            '#0000FF', '#FF33FF', '#FF0033', '#66FF66', '#FF6600', '#3399FF',
            '#FF6699', '#CC00CC', '#FF0033', '#6699FF', '#66FF66', '#FF6600',
            '#00FFCC', '#99FF33', '#CC3333', '#33CC99', '#FF3300', '#33FF33'
          ],
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
      <section className='fluxo_section'>
              {/* Exibindo o gráfico */}
      <div style={{ height: '500px', width: '500px', margin: 'auto'}} className='grafico_container'>
        {chartData.labels ? <Pie data={chartData} /> : <p>Carregando gráfico...</p>}
      </div>

      <div className="second_division">
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



          {/* Exibindo os dados da API */}
          <div className="financas-container">
            {dataApi.length > 0 ? (
              dataApi.map((item, index) => (
                <div key={index} className="financa-item">
                  {/* Exibe o ModalExcluirGasto apenas quando selectedButton for 'gastos' */}
                  {selectedButton === 'gastos' && (
                    <div className="financa-actions">
                      <ModalExcluirGasto gasto={item} className="excluirGasto" />
                      <ModalEditDebitos gasto={item} className="editDebito" />
                    </div>
                  )}

                  {/* Exibe o ModalExcluirGanho apenas quando selectedButton for 'ganhos' */}
                  {selectedButton === 'ganhos' && (
                    <div className="financa-actions">
                      <ModalExcluirGanho ganho={item} className="excluirGanho" />
                      <ModalEditGanhos ganho={item} className="editGanho" />
                    </div>
                  )}

                  <p className={`financa-text ${selectedButton === 'ganhos' ? 'ganho' : 'gasto'}`}>
                    {item.nome} - R${parseFloat(item.valor).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p>Carregando dados...</p>
            )}
          </div>
      </div>
      </div>
      </section>
    </>
  );
};

export default ListaFluxo;
