import React, { useEffect, useState } from 'react';
import '../styles/clientes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button, DropdownItem } from 'react-bootstrap';
import ModalCliente from '../components/ModalCliente';
import { FiSearch } from "react-icons/fi";
import ModalEditar from '../components/ModalEditar';
import NovoCliente from '../components/NovoCliente';
import ModalExcluirCliente from '../components/ModalExcluirCliente.jsx/ModalExcluirCliente';
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [clientesFiltrados, setClientesFiltrados] = useState([]); 


  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pacientes')
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.status}`);
        }
        const data = await response.json();
        setClientes(data);
        setClientesFiltrados(data); 
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

    const handleOrdenarClientesAZ = () => {
    const clientesOrdenados = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome));
    setClientesFiltrados(clientesOrdenados);
  };


    const handleFiltrarAtivos = () => {
      const ativos = clientes.filter(cliente => cliente.status === 1);
      setClientesFiltrados(ativos);
    };

    const handleFiltrarInativos = () => {
      const inativos = clientes.filter(cliente => cliente.status !== 1);
      setClientesFiltrados(inativos);
    };



  const handleFiltrarRecente = () => {
    const recente = [...clientes].sort((a, b) => {
      const dataA = new Date(a.proximaConsulta || "2100-01-01"); 
      const dataB = new Date(b.proximaConsulta || "2100-01-01");
      return dataB - dataA;
    });

    recente.sort((a, b) => {
      if (a.proximaConsulta === null && b.proximaConsulta !== null) {
        return 1;  
      }
      if (a.proximaConsulta !== null && b.proximaConsulta === null) {
        return -1; 
      }
      return 0;  
    });

    setClientesFiltrados(recente);
  };
  
  const handleUltimaConsulta = () => {
    const ultimos = [...clientes].sort((a,b) => {
      const dataA = new Date(a.ultimaConsulta || "2100-01-01"); 
      const dataB = new Date(b.ultimaConsulta || "2100-01-01");
      return dataB - dataA;
    })

    ultimos.sort((a, b) => {
      if (a.ultimaConsulta === null && b.ultimaConsulta !== null) {
        return 1;  
      }
      if (a.ultimaConsulta !== null && b.ultimaConsulta === null) {
        return -1; 
      }
      return 0;  
    });

    setClientesFiltrados(ultimos);
  }

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
          <Dropdown.Item href="#/action-1" onClick={handleFiltrarAtivos}>Ativos</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={handleFiltrarInativos}>Inativos</Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={handleOrdenarClientesAZ}>A - Z</Dropdown.Item>
          <Dropdown.Item href="#/action-4" onClick={handleFiltrarRecente}>Consultas futuras</Dropdown.Item>
          <DropdownItem href="#/action-5" onClick={handleUltimaConsulta}>Ultimas consultas</DropdownItem>
        </Dropdown.Menu>
      </Dropdown>

      <NovoCliente></NovoCliente>
    </div>

      <div className="tabela_clientes">
        <table>
          <thead>
            <tr>
              <th className="thStatus">Status</th>
              <th className="thNome">Nome</th>
              <th className="thIdade">Idade</th>
              <th className="thConsulta">Última Consulta</th>
              <th className="thConsulta">Próxima Consulta</th>
              <th className="tdInformacoes">Informações</th>
              <th className='thEditar'>Editar</th>
              <th className='thEditar'>Excluir</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>Ativo</td>
                  <td>Exemplo</td>
                  <td className='thIdade'>20</td>
                  <td>12/23/3444</td>
                  <td>12</td>
                  <td>
                    <Button style={{ width: '40px' }}><FaPlus /></Button>
                  </td>
                  <td>
                    <Button style={{ width: '40px' }}><FaEdit /></Button>
                  </td>
                  <td>
                    <ModalExcluirCliente></ModalExcluirCliente>
                  </td>
                </tr>


                {clientesFiltrados.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.status === 1 ? "Ativo" : "Inativo"}</td>
                  <td>{cliente.nome}</td>
                  <td className='thIdade'>{calcularIdade(cliente.idade) || "—"}</td>
                  <td>{formatarData(cliente.ultimaConsulta)}</td>
                  <td>{cliente.proximaConsulta || "—"}</td>
                  <td>
                    <Button className='Mais' variant="primary" onClick={() => handleShowModal(cliente)} style={{ width: '100px' }}>
                      <FaPlus />
                    </Button>
                  </td>
                  <td>
                    <ModalEditar cliente={cliente}></ModalEditar>
                  </td>
                  <td>
                    <ModalExcluirCliente cliente={cliente}></ModalExcluirCliente>
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
