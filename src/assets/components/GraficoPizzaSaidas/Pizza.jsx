import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Pizza.css';


ChartJS.register(ArcElement, Tooltip, Legend);

const MyDoughnutChart = () => {


  const [dataApi, setDataApi] = useState([]);

  const fetchDebitos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasDebitos');
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
    fetchDebitos();
  }, []);

  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF',
    '#FF33CC', '#FF6600', '#3366FF', '#99CC00', '#FF0000', '#00FF00',
    '#0000FF', '#FF33FF', '#FF0033', '#66FF66', '#FF6600', '#3399FF',
    '#FF6699', '#CC00CC', '#FF0033', '#6699FF', '#66FF66', '#FF6600',
    '#00FFCC', '#99FF33', '#CC3333', '#33CC99', '#FF3300', '#33FF33'
  ];

  const data = {
    labels: dataApi.map((debito) => debito.nome),
    datasets: [
      {
        label: 'Débitos',
        data: dataApi.map((debito) => debito.valor), 
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', 
      },
    },
  };

  return (
    <div className="pizza">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default MyDoughnutChart;