import React, { useEffect, useState } from 'react';
import '../styles/clientes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button } from 'react-bootstrap';
import ModalCliente from '../components/ModalCliente';

const listagemPacientes = () => {
  const [clientes, setClientes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);


  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pacientes');
        
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.status}`);
        }
    
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  const formatarData = (data) => {
    if (!data || data === "0000-00-00") return "—";
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString();
  };

  const handleShowModal = (cliente) => {
    setClienteSelecionado(cliente);
    setModalShow(true);
  };

  return (
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.statusPaciente === 1 ? "Ativo" : "Inativo"}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.idadeCalculada || "—"}</td>
                <td>{formatarData(cliente.ultimaConsulta)}</td>
                <td>{cliente.proximaConsulta || "—"}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowModal(cliente)}>
                    Mais
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {clienteSelecionado && (
        <ModalCliente
          show={modalShow}
          onHide={() => setModalShow(false)}
          cliente={clienteSelecionado}
        />
      )}
    </div>
  );
};

export default listagemPacientes;
