import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";

const updateFinancasEntrada = async (id, data) => {
  try {
    const response = await fetch(`http://localhost:3000/api/financasCreditos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar o ganho');
    }

    const result = await response.json();
    console.log('Ganho atualizado com sucesso:', result);
  } catch (error) {
    console.error('Erro ao atualizar ganho:', error);
  }
};

function ModalEditGanhos({ ganho }) {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [dataCredito, setDataCredito] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Preencher os campos com os dados do ganho ao abrir o modal
  useEffect(() => {
    if (ganho) {
      setNome(ganho.nome);
      setValor(ganho.valor);
      setDataCredito(ganho.dataCredito);
    }
  }, [ganho]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nome,
      valor,
      dataCredito,
    };

    // Atualiza o ganho
    updateFinancasEntrada(ganho.id, data);

    // Limpa os campos após a submissão
    setNome('');
    setValor('');
    setDataCredito('');

    // Fecha o modal
    handleClose();
  };

  return (
    <>
      {/* Botão para abrir o modal */}
      <Button variant="success" onClick={handleShow} style={{ width: '40px' }}>
         <FaEdit />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ganho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                id="nome"
                className="form-control"
                placeholder="Nome do ganho"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="valor" className="form-label">Valor</label>
              <input
                type="number"
                id="valor"
                className="form-control"
                placeholder="Valor do ganho"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dataCredito" className="form-label">Data de Crédito</label>
              <input
                type="date"
                id="dataCredito"
                className="form-control"
                value={dataCredito}
                onChange={(e) => setDataCredito(e.target.value)}
                required
              />
            </div>

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

export default ModalEditGanhos;
