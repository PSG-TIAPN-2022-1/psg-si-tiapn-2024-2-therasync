import React, { useState, useEffect } from 'react';
import './ScrollableComponent.css'; // Importando o arquivo de estilo
import { Button } from 'react-bootstrap';

const ListaFluxo = () => {
  // Estado para armazenar os dados da API
  const [dataApi, setDataApi] = useState([]);
  // Estado para controlar se o botão "Ganhos" ou "Gastos" está ativo
  const [selectedButton, setSelectedButton] = useState('gastos');

  // Função para buscar dados de Débitos (Gastos)
  const fetchDebitos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasDebitos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const data = await response.json();
      setDataApi(data);  // Armazenando os dados da API no estado
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  // Função para buscar dados de Créditos (Ganhos)
  const fetchCreditos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/financasCreditos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }

      const data = await response.json();
      setDataApi(data);  // Armazenando os dados da API no estado
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  // Função para alternar entre os dados de Ganhos e Gastos
  const handleButtonClick = (type) => {
    setSelectedButton(type);
    if (type === 'ganhos') {
      fetchCreditos();
    } else {
      fetchDebitos();
    }
  };

  // Efeito para buscar os dados de Gastos inicialmente
  useEffect(() => {
    fetchDebitos();
  }, []);

  return (
    <>
      <div className="buttons">
        <Button 
          variant="success"
          size='sm' 
          onClick={() => handleButtonClick('ganhos')} 
          active={selectedButton === 'ganhos'}
        >
          Ganhos
        </Button>
        <Button 
          variant="danger"
          size='sm' 
          onClick={() => handleButtonClick('gastos')} 
          active={selectedButton === 'gastos'}
        >
          Gastos
        </Button>
      </div>

      <div className="scrollable-container">
        <h2>{selectedButton === 'ganhos' ? 'Ganhos' : 'Gastos'}</h2>
        <p></p>

        {/* Exibindo os dados da API */}
        <div>
          {dataApi.length > 0 ? (
            dataApi.map((item, index) => (
              <p key={index} className={selectedButton === 'ganhos' ? 'ganho' : 'gasto'}>
                <input type="checkbox" name="mensal" className="checkbox_mensal" />
                {selectedButton === 'ganhos' ? item.nome : item.nome} 
              </p>
            ))
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListaFluxo;
