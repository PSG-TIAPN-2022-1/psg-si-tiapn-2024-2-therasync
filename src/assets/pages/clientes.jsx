import React from 'react';
import '../styles/clientes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown,Button,Modal } from 'react-bootstrap';
import ModalCliente from '../components/ModalCliente';



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
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Última Consulta</th>
            <th>Próxima Consulta</th>
            <th>sdf</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ativo</td>
            <td>Maria Silva</td>
            <td>35</td>
            <td>10/10/2024</td>
            <td>10/12/2024</td>
            <td>
              <>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Mais
                </Button>

                <ModalCliente         
                show={modalShow}
                onHide={() => setModalShow(false)}>

                </ModalCliente>
              </>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Clientes