import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";

// Função para atualizar o débito
const updateFinancasDebito = async (id, data) => {
  try {
    const response = await fetch(`http://localhost:3000/api/financasDebitos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar o gasto');
    }

    const result = await response.json();
    console.log('Gasto atualizado com sucesso:', result);
  } catch (error) {
    console.error('Erro ao atualizar gasto:', error);
  }
};

function ModalEditDebitos({ gasto }) {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [dataDebito, setDataDebito] = useState('');
  const [recorrente, setRecorrente] = useState(false); // Estado para recorrência

  // Função para abrir o modal
  const handleShow = () => setShow(true);

  // Função para fechar o modal
  const handleClose = () => setShow(false);

  // Preencher os campos com os dados do gasto ao abrir o modal
  useEffect(() => {
    if (gasto) {
      setNome(gasto.nome);
      setValor(gasto.valor);
      setDataDebito(gasto.dataDebito);
      setRecorrente(gasto.recorrente || false); // Define recorrente se existir
    }
  }, [gasto]); // O useEffect será disparado sempre que o gasto for alterado

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nome,
      valor,
      dataDebito,
      recorrente, // Inclui recorrência no objeto de atualização
    };

    // Atualiza o débito no banco de dados
    updateFinancasDebito(gasto.id, data); // Agora usando o id do gasto

    // Limpa os campos após a submissão
    setNome('');
    setValor('');
    setDataDebito('');
    setRecorrente(false);

    // Fecha o modal
    handleClose();
  };

  return (
    <>
      {/* Botão para abrir o modal de edição */}
      <Button variant="danger" onClick={handleShow} style={{ width: '40px' }}>
        <FaEdit />
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Campo para nome do gasto */}
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                id="nome"
                className="form-control"
                placeholder="Nome do gasto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            {/* Campo para valor do gasto */}
            <div className="mb-3">
              <label htmlFor="valor" className="form-label">Valor</label>
              <input
                type="number"
                id="valor"
                className="form-control"
                placeholder="Valor do gasto"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>

            {/* Campo para a data do gasto */}
            <div className="mb-3">
              <label htmlFor="dataDebito" className="form-label">Data de Gasto</label>
              <input
                type="date"
                id="dataDebito"
                className="form-control"
                value={dataDebito}
                onChange={(e) => setDataDebito(e.target.value)}
                required
              />
            </div>

            {/* Campo para recorrência */}
            <div className="mb-3">
              <label className="form-label">Recorrente</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="recorrente"
                    id="recorrenteSim"
                    value="true"
                    checked={recorrente === true}
                    onChange={() => setRecorrente(true)}
                  />
                  <label className="form-check-label" htmlFor="recorrenteSim">Sim</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="recorrente"
                    id="recorrenteNao"
                    value="false"
                    checked={recorrente === false}
                    onChange={() => setRecorrente(false)}
                  />
                  <label className="form-check-label" htmlFor="recorrenteNao">Não</label>
                </div>
              </div>
            </div>

            {/* Botões para fechar ou atualizar */}
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose}>Fechar</Button>
              <Button variant="primary" type="submit" className="ms-2">Atualizar</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditDebitos;

