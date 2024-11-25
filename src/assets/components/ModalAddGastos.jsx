import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const sendFinancasDebito = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/api/financasDebitos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro na resposta', error);
    }

    const result = await response.json();
    console.log('Débito salvo com sucesso:', result);
  } catch (error) {
    console.error('Erro ao enviar débitos:', error);
  }
};

function ModalAddDebitos() {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [dataDebito, setDataDebito] = useState('');
  const [recorrente, setRecorrente] = useState('nao'); // "sim" ou "nao"

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nome,
      valor,
      dataDebito,
      recorrente,
    };

    sendFinancasDebito(data);
    setNome('');
    setValor('');
    setDataDebito('');
    setRecorrente('nao'); // Resetar para "nao"

    handleClose();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Adicionar Débito
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Débito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do débito"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="valor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor do débito"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataDebito">
              <Form.Label>Data de Débito</Form.Label>
              <Form.Control
                type="date"
                value={dataDebito}
                onChange={(e) => setDataDebito(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recorrente">
              <Form.Label>
                É recorrente? Caso sim, será debitado na mesma data todo mês
              </Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Sim"
                  name="recorrente"
                  id="recorrente-sim"
                  value="sim"
                  checked={recorrente === "sim"}
                  onChange={(e) => setRecorrente(e.target.value)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Não"
                  name="recorrente"
                  id="recorrente-nao"
                  value="nao"
                  checked={recorrente === "nao"}
                  onChange={(e) => setRecorrente(e.target.value)}
                  inline
                />
              </div>
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

export default ModalAddDebitos;
