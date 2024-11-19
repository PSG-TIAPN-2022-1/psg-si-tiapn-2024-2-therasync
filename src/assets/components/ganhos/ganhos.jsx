import React, { useEffect, useState } from 'react';
import './ganhos.css';

const Creditos = ({ mes, ano, dadosAtualizados }) => {
  const [Totalcreditos, setTotalCreditos] = useState(0);

  const fetchCreditos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasCreditos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const data = await response.json();
      console.log("Dados recebidos:", data);

      const total = data
        .filter(item => {
          const dataCredito = new Date(item.datacredito); // Corrigir para usar 'datacredito'
          
          // Ajuste para comparar mês e ano corretamente
          return (
            dataCredito.getMonth() === mes && // Mes vem no formato 0-11
            dataCredito.getFullYear() === ano &&
            parseFloat(item.valor) > 0
          );
        })
        .reduce((acc, item) => acc + parseFloat(item.valor), 0);

      setTotalCreditos(total);
    } catch (error) {
      console.error("Erro ao buscar créditos:", error);
    }
  };

  useEffect(() => {
    fetchCreditos();
  }, [mes, ano, dadosAtualizados]);

  return (
    <div className="ganhos">
      <h4 className="cardTitle">Créditos</h4>
      <p className="textDebitos">R${Totalcreditos.toFixed(2)}</p>
    </div>
  );
};

export default Creditos;
