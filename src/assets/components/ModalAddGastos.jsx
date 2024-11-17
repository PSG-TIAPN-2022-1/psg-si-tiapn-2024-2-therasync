import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// Função para enviar os dados para a API de gastos
const sendFinancasSaida = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/api/financasSaidas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar os dados');
    }

    const result = await response.json();
    console.log('Dados salvos com sucesso:', result);
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
};

function ModalAddGastos() {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [dataSaida, setDataSaida] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      nome,
      valor,
      dataSaida,
    };

    sendFinancasSaida(data);  // Envia os dados para a API de Saídas

    // Fechar o modal após salvar
    handleClose();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Adicionar Gasto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do gasto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="valor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor do gasto"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataSaida">
              <Form.Label>Data de Saída</Form.Label>
              <Form.Control
                type="date"
                value={dataSaida}
                onChange={(e) => setDataSaida(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddGastos;
