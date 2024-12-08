import React, { useEffect, useState } from 'react';
import './linhas.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, 
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, 
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyLineChart = () => {
  const [dataApi, setDataApi] = useState([]);

  const fetchCreditos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasCreditos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const data = await response.json();
      setDataApi(data);  
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    fetchCreditos();
  }, []);

  // Função para agrupar os créditos por mês
  const agruparPorMes = (dados) => {
    const creditosPorMes = {};

    // Inicializa o objeto com os 12 meses
    for (let i = 1; i <= 12; i++) {
      creditosPorMes[i] = 0;
    }

    dados.forEach(item => {
      const dataCredito = new Date(item.datacredito); // Corrige para 'datacredito'
      
      // Verifica se a data é válida
      if (!isNaN(dataCredito.getTime())) {
        const mes = dataCredito.getMonth() + 1; // Meses começam de 0, então somamos 1

        // Verifica se o valor é válido e soma
        const valorCredito = parseFloat(item.valor);
        if (!isNaN(valorCredito)) {
          creditosPorMes[mes] += valorCredito;
        }
      }
    });

    return creditosPorMes;
  };

  // Agrupa os dados de acordo com os meses
  const creditosAgrupados = agruparPorMes(dataApi);

  // Definir os rótulos (meses)
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  // Obter os valores agrupados por mês
  const valores = Object.values(creditosAgrupados);

  // Configuração dos dados para o gráfico
  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Créditos por Mês',
        data: valores,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  // Configuração das opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Gráfico de Créditos por Mês'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className='linhas'>
      <p className='TituloGrafico'>Faturamento Anual</p>
      <Line data={data} options={options} />
    </div>
  );
};

export default MyLineChart;
