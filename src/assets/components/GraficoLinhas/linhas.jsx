import React from 'react';
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
  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
    datasets: [
      {
        label: 'Vendas 2024',
        data: [50, 60, 70, 80, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Gráfico de Linhas - Vendas 2024'
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
      <Line data={data} options={options} />
    </div>
  );
};

export default MyLineChart;
