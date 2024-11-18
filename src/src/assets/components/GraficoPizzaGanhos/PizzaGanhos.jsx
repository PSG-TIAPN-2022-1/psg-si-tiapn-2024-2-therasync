import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoCreditos = () => {


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


  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF',
    '#FF33CC', '#FF6600', '#3366FF', '#99CC00', '#FF0000', '#00FF00',
    '#0000FF', '#FF33FF', '#FF0033', '#66FF66', '#FF6600', '#3399FF',
    '#FF6699', '#CC00CC', '#FF0033', '#6699FF', '#66FF66', '#FF6600',
    '#00FFCC', '#99FF33', '#CC3333', '#33CC99', '#FF3300', '#33FF33'
  ];


  const data = {
    labels: dataApi.map((credito) => credito.nome),
    datasets: [
      {
        label: 'Créditos',
        data: dataApi.map((credito) => credito.valor),
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

export default GraficoCreditos;
