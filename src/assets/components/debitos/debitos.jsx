import React, { useEffect, useState } from 'react';
import './debitos.css';

const Debitos = ({ mes, ano, dadosAtualizados }) => {
  const [totalDebitos, setTotalDebitos] = useState(0);

  const fetchDebitos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasDebitos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const data = await response.json();
      const total = data
        .filter(item => {
          const dataDebito = new Date(item.dataDebito);
          return (
            dataDebito.getMonth() === mes &&
            dataDebito.getFullYear() === ano &&
            parseFloat(item.valor) > 0
          );
        })
        .reduce((acc, item) => acc + parseFloat(item.valor), 0);

      setTotalDebitos(total);
    } catch (error) {
      console.error("Erro ao buscar débitos:", error);
    }
  };

  useEffect(() => {
    fetchDebitos();
  }, [mes, ano, dadosAtualizados]);

  return (
    <div className="debitos">
      <h4 className="cardTitle">Débitos</h4>
      <p className="textDebitos">R${totalDebitos.toFixed(2)}</p>
    </div>
  );
};

export default Debitos;
