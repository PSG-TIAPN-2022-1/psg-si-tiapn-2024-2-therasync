import React from 'react'
import { Button } from 'react-bootstrap';
import ModalUsuarios from '../components/ModalUsuario/ModalUsuario';

const Configurações = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    window.location.reload(); // Recarrega a página para atualizar o estado
  };
  return (
    <div className='container'>
      <p id='titulo_container'>Configurações</p>
      <ModalUsuarios></ModalUsuarios>
      <hr></hr>
      <button type="button" class="btn btn-danger" onClick={handleLogout}>Logout</button>
      
    </div>
  )
}

export default Configurações;
