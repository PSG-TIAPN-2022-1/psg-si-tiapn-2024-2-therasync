// ScrollableComponent.jsx
import React from 'react';
import './ScrollableComponent.css'; // Importando o arquivo de estilo

const ListaFluxo = () => {
  return (
    <div className="scrollable-container">
      <h2>Conteúdo com scroll</h2>
      <p>Esse é um exemplo de conteúdo com scroll próprio. Você pode adicionar mais conteúdo aqui para testar o comportamento do scroll.</p>
      {/* Exemplo de conteúdo longo */}
      {[...Array(30)].map((_, index) => (
        <p key={index}>Linha de texto #{index + 1}</p>
      ))}
    </div>
  );
};

export default ListaFluxo;
