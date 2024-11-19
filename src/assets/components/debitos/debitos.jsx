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
      console.log("Dados recebidos:", data);

      // Filtra os dados para o mês e ano específicos
      const total = data
        .filter(item => {
          const dataDebito = new Date(item.datadebito); // Corrigido para o campo correto

          // Verifica se a data do débito está no mês e ano corretos
          return (
            dataDebito.getMonth() === mes && 
            dataDebito.getFullYear() === ano &&
            !isNaN(dataDebito.getTime()) && // Verifica se a data é válida
            parseFloat(item.valor) > 0 // Garantir que o valor seja positivo
          );
        })
        .reduce((acc, item) => acc + parseFloat(item.valor), 0); // Soma os valores válidos

      setTotalDebitos(total);
    } catch (error) {
      console.error("Erro ao buscar débitos:", error);
    }
  };

  useEffect(() => {
    fetchDebitos(); // Recarrega os dados sempre que o mês, ano ou dados são atualizados
  }, [mes, ano, dadosAtualizados]);

  return (
    <div className="debitos">
      <h4 className="cardTitle">Débitos</h4>
      <p className="textDebitos">R${totalDebitos.toFixed(2)}</p>
    </div>
  );
};

export default Debitos;
