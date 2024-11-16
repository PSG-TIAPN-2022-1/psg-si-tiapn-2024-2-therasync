import React, { useEffect, useState } from 'react';
import './linhas.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,  // Registro do ponto
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar os componentes necessários para o gráfico
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, // Registro do ponto
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
      setDataApi(data);  // Armazenando os dados da API no estado
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

    // Inicializar o objeto com todos os meses de 2024 (1 a 12)
    for (let i = 1; i <= 12; i++) {
      creditosPorMes[i] = 0;
    }

    dados.forEach(item => {
      if (item.dataCredito !== '0000-00-00') {
        const dataCredito = new Date(item.dataCredito);
        const mes = dataCredito.getMonth() + 1; // Ajuste porque getMonth() retorna 0 (janeiro) a 11 (dezembro)

        creditosPorMes[mes] += parseFloat(item.valor); // Soma o valor do crédito
      }
    });

    return creditosPorMes;
  };

  // Agrupar dados e preparar para o gráfico
  const creditosAgrupados = agruparPorMes(dataApi);

  // Extrair os meses e valores para o gráfico
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  const valores = Object.values(creditosAgrupados);

  // Dados para o gráfico
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

  // Opções do gráfico
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
