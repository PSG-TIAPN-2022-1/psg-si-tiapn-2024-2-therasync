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
      console.log("Dados recebidoas:", data);
      const consultas = data.filter(item => {
        const dataCredito = new Date(item.dataCredito);
        return (
          item.nome === "Consulta" &&
          dataCredito.getMonth() === mes &&
          dataCredito.getFullYear() === ano
        );
      });

      const totalValor = consultas.reduce((acc, item) => acc + parseFloat(item.valor), 0);
      const ticketMedioCalculado = consultas.length > 0 ? totalValor / consultas.length : 0;

      setTicketMedio(ticketMedioCalculado);
    } catch (error) {
      console.error("Erro ao buscar créditos:", error);
    }
  };

  useEffect(() => {
    fetchCreditos();
  }, [mes, ano, dadosAtualizados]);

  return (
    <div className="MediaConsulta">
      <h5 className="cardTitle">Ticket Médio</h5>
      <p className="textDebitos">R${ticketMedio.toFixed(2)}</p>
    </div>
  );
};

export default Creditos;
