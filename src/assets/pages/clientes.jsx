import React, { useEffect, useState } from 'react';
import '../styles/clientes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button } from 'react-bootstrap';
import ModalCliente from '../components/ModalCliente';
import { FiSearch } from "react-icons/fi";
import ModalEditar from '../components/ModalEditar';
import NovoCliente from '../components/NovoCliente';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);


  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pacientes')
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

      <div className="options_container">
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pesquise..."
          className="search-input"
        />
      </div>

      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Selecionar Opção
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Ativos</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Inativos</Dropdown.Item>
          <Dropdown.Item href="#/action-3">A - Z</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Consultas mais recentes</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <NovoCliente></NovoCliente>
    </div>

      <div className="tabela_clientes">
        <table>
          <thead>
            <tr>
              <th class="thStatus">Status</th>
              <th class="thNome">Nome</th>
              <th class="thIdade">Idade</th>
              <th class="thConsulta">Última Consulta</th>
              <th class="thConsulta">Próxima Consulta</th>
              <th class="tdInformacoes">Informações</th>
              <th className='thEditar'>Editar</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.statusPaciente === 1 ? "Ativo" : "Inativo"}</td>
                <td>{cliente.nome}</td>
                <td >{calcularIdade(cliente.idade) || "—"}</td>
                <td>{formatarData(cliente.ultimaConsulta)}</td>
                <td>{cliente.proximaConsulta || "—"}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowModal(cliente)}>
                    Mais
                  </Button>
                </td>
                <td>
                  <ModalEditar></ModalEditar>
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

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return '—';
  
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

export default Clientes;
