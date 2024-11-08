import React from 'react';
import '../styles/clientes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown,Button,Modal } from 'react-bootstrap';
import ModalCliente from '../components/ModalCliente';
import ListagemPacientes from '../components/listagemPacientes.jsx';


const Clientes = () => {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    /*Tudo correspondente a pagina deve estar dentro de container para melhor renderização do conteúdo da pagina */
    <div className='clientes_container'>
      <p id='clientes_titulo_container'>Clientes</p>

      <div className='options_container'>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Selecionar Opção
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Opção 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Opção 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Opção 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="tabela_clientes">
      
      <ListagemPacientes></ListagemPacientes>

      </div>
    </div>
  )
}

export default Clientes