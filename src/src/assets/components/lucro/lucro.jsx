import React, { useEffect, useState } from 'react';
import './lucro.css';

const LucroTotal = ({ mes, ano, dadosAtualizados }) => {
  const [lucroTotal, setLucroTotal] = useState(0);

  const fetchLucro = async () => {
    try {
      // Busca os dados de créditos e débitos
      const responseCreditos = await fetch('http://localhost:3000/api/financasCreditos');
      const responseDebitos = await fetch('http://localhost:3000/api/financasDebitos');

      if (!responseCreditos.ok || !responseDebitos.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      // Converte as respostas para JSON
      const dataCreditos = await responseCreditos.json();
      const dataDebitos = await responseDebitos.json();

      // Calcula o total de créditos no mês e ano especificados
      const totalCreditos = dataCreditos
        .filter(item => {
          const dataCredito = new Date(item.datacredito); // Usando 'datacredito'
          return (
            dataCredito.getMonth() === mes &&
            dataCredito.getFullYear() === ano &&
            !isNaN(dataCredito.getTime()) && // Verifica se a data é válida
            parseFloat(item.valor) > 0 // Garante que o valor seja positivo
          );
        })
        .reduce((acc, item) => acc + parseFloat(item.valor), 0); // Soma os valores dos créditos

      // Calcula o total de débitos no mês e ano especificados
      const totalDebitos = dataDebitos
        .filter(item => {
          const dataDebito = new Date(item.datadebito); // Usando 'datadebito'
          return (
            dataDebito.getMonth() === mes &&
            dataDebito.getFullYear() === ano &&
            !isNaN(dataDebito.getTime()) && // Verifica se a data é válida
            parseFloat(item.valor) > 0 // Garante que o valor seja positivo
          );
        })
        .reduce((acc, item) => acc + parseFloat(item.valor), 0); // Soma os valores dos débitos

      // Calcula o lucro total
      const lucro = totalCreditos - totalDebitos;
      setLucroTotal(lucro); // Atualiza o estado com o lucro
    } catch (error) {
      console.error("Erro ao buscar dados:", error); // Log de erro
    }
  };

  useEffect(() => {
    fetchLucro(); // Recarrega os dados sempre que o mês, ano ou dados são atualizados
  }, [mes, ano, dadosAtualizados]);

  return (
    <div className="lucro">
      <h4 className="cardTitle">Lucro Total</h4>
      <p className="textDebitos">R${lucroTotal.toFixed(2)}</p>
    </div>
  );
};

export default LucroTotal;
