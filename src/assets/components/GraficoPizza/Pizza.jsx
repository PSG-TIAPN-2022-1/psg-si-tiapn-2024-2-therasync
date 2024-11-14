import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Pizza.css';

// Registrando os elementos e plugins necessários
ChartJS.register(ArcElement, Tooltip, Legend);

const MyDoughnutChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // posição da legenda (topo)
      },
    },
  };

  return (
    <div className="pizza">
        <Doughnut data={data} options={options} />;
    </div>
)
};

export default MyDoughnutChart;