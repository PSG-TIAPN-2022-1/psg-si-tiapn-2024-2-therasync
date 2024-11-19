import React, { useEffect, useState } from 'react';
import './MediaConsulta.css';

const Creditos = ({ mes, ano, dadosAtualizados }) => {
  const [ticketMedio, setTicketMedio] = useState(0);

  const fetchCreditos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasCreditos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const data = await response.json();
      console.log("Dados recebidos:", data);

      // Filtra as consultas do mês e ano especificados
      const consultas = data.filter(item => {
        const dataCredito = new Date(item.datacredito); // Usando 'datacredito' para a data
        return (
          item.nome === "consulta" && // Certifique-se de que o nome é exatamente "consulta"
          dataCredito.getMonth() === mes &&
          dataCredito.getFullYear() === ano &&
          !isNaN(dataCredito.getTime()) && // Verifica se a data é válida
          parseFloat(item.valor) > 0 // Garante que o valor seja positivo
        );
      });

      if (consultas.length === 0) {
        setTicketMedio(0); // Se não houver consultas, ticket médio é 0
        return;
      }

      // Calcula o total das consultas
      const totalValor = consultas.reduce((acc, item) => acc + parseFloat(item.valor), 0);

      // Calcula o ticket médio
      const ticketMedioCalculado = totalValor / consultas.length;
      setTicketMedio(ticketMedioCalculado.toFixed(2)); // Atualiza o estado com o valor do ticket médio
    } catch (error) {
      console.error("Erro ao buscar créditos:", error);
    }
  };

  useEffect(() => {
    fetchCreditos(); // Recarrega os dados sempre que o mês, ano ou dados são atualizados
  }, [mes, ano, dadosAtualizados]);

  return (
    <div className="MediaConsulta">
      <h5 className="cardTitle">Ticket Médio</h5>
      <p className="textDebitos">R${ticketMedio}</p>
    </div>
  );
};

export default Creditos;
