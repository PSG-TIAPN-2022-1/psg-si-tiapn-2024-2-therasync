import React from 'react'
import { Button } from 'react-bootstrap';

const Configurações = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    window.location.reload(); // Recarrega a página para atualizar o estado
  };
  return (
    <div className='container'>
      <p id='titulo_container'>Configurações</p>
      <button type="button" class="btn btn-success">Adicionar usuário</button>
      <hr></hr>
      <button type="button" class="btn btn-danger" onClick={handleLogout}>Logout</button>
      
    </div>
  )
}

export default Configurações;