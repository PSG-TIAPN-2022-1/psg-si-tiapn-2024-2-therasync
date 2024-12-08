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

    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar ganho:', error);
    throw error;
  }
};

function ModalEditGanhos({ ganho, atualizarGanhos }) {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [datacredito, setDatacredito] = useState('');
  const [recorrente, setRecorrente] = useState('nao');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (ganho) {
      setNome(ganho.nome);
      setValor(ganho.valor);
      setDatacredito(ganho.datacredito || '');
      setRecorrente(ganho.recorrente || 'nao');
    }
  }, [ganho]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { nome, valor, datacredito, recorrente };

    try {
      await updateFinancasEntrada(ganho.id, data);
      alert('Ganho atualizado com sucesso!');
      handleClose();
    } catch (error) {
      alert('Erro ao atualizar ganho. Verifique os dados.');
    }
  };

  return (
    <>
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
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="datacredito" className="form-label">Data de Crédito</label>
              <input
                type="date"
                id="datacredito"
                className="form-control"
                value={datacredito}
                onChange={(e) => setDatacredito(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">É recorrente?</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="recorrente-sim"
                    className="form-check-input"
                    name="recorrente"
                    value="sim"
                    checked={recorrente === 'sim'}
                    onChange={(e) => setRecorrente(e.target.value)}
                  />
                  <label htmlFor="recorrente-sim" className="form-check-label">Sim</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="recorrente-nao"
                    className="form-check-input"
                    name="recorrente"
                    value="nao"
                    checked={recorrente === 'nao'}
                    onChange={(e) => setRecorrente(e.target.value)}
                  />
                  <label htmlFor="recorrente-nao" className="form-check-label">Não</label>
                </div>
              </div>
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

