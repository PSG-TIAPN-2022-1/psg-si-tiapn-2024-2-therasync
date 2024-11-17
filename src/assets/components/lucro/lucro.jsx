import React, { useEffect, useState } from 'react';
import './lucro.css';

const LucroTotal = ({ mes, ano, dadosAtualizados }) => {
  const [lucroTotal, setLucroTotal] = useState(0);

  const fetchLucro = async () => {
    try {
      const responseCreditos = await fetch('http://localhost:3000/api/financasCreditos');
      const responseDebitos = await fetch('http://localhost:3000/api/financasDebitos');

      if (!responseCreditos.ok || !responseDebitos.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const dataCreditos = await responseCreditos.json();
      const dataDebitos = await responseDebitos.json();

      const totalCreditos = dataCreditos
        .filter(item => {
          const data = new Date(item.dataCredito);
          return (
            data.getMonth() === mes &&
            data.getFullYear() === ano
          );
        })
        .reduce((acc, item) => acc + parseFloat(item.valor), 0);

      const totalDebitos = dataDebitos
        .filter(item => {
          const data = new Date(item.dataDebito);
          return (
            data.getMonth() === mes &&
            data.getFullYear() === ano
          );
        })
        .reduce((acc, item) => acc + parseFloat(item.valor), 0);

      const lucro = totalCreditos - totalDebitos;
      setLucroTotal(lucro);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchLucro();
  }, [mes, ano, dadosAtualizados]);

  return (
    <div className="lucro">
      <h4 className="cardTitle">Lucro Total</h4>
      <p className="textDebitos">R${lucroTotal.toFixed(2)}</p>
    </div>
  );
};

export default LucroTotal;
