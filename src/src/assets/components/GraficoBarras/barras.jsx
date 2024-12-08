import React from 'react';
import { useState , useEffect} from 'react';
import './barras.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const MyBarChart = ({periodo}) => {
  const [consultas, setConsultas] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
      const fetchConsultas = async () => {
          try {
              const response = await fetch("http://localhost:3000/api/consultas");

              if (!response.ok) {
                  throw new Error(`Erro na resposta da API: ${response.status}`);
              }

              const data = await response.json();
              setConsultas(data);
          } catch (error) {
              console.error("Erro ao buscar consultas:", error);
          }
      };
      fetchConsultas();
  }, []);

  // Converte a string de data em objeto Date fora do filtro
  const consultasAno = consultas.filter((consulta) => {
    const dataConsulta = new Date(consulta.dataconsulta); // Converte a data
    return dataConsulta.getFullYear() == currentDate.getFullYear(); // Filtra pelo ano
  });

  // Função para contar consultas em um mês específico
  const meses = (mes) => {
    return consultasAno.filter((consulta) => {
        const dataConsulta = new Date(consulta.dataconsulta); // Converte a data
        return dataConsulta.getMonth() === mes; // Filtra pelo mês
    }).length; // Use .length para contar
  };

  /* controle da api */

  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'consultas 2024',
        data: [
          meses(0), // Janeiro (0)
          meses(1), // Fevereiro (1)
          meses(2), // Março (2)
          meses(3), // Abril (3)
          meses(4), // Maio (4)
          meses(5), // Junho (5)
          meses(6), // Julho (6)
          meses(7), // Agosto (7)
          meses(8), // Setembro (8)
          meses(9), // Outubro (9)
          meses(10), // Novembro (10)
          meses(11), // Dezembro (11)
      ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
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
        text: 'Quantidade de consultas por mês'
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
    <div className='graficoBarras'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MyBarChart;