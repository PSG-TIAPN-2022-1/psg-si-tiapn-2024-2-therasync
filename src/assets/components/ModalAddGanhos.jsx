import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const sendFinancasEntrada = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/api/financasCreditos', {
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

function ModalAddGanhos() {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [recorrente, setRecorrente] = useState(false); // Estado para a checkbox
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      nome,
      valor,
      dataEntrada,
      recorrente,
    };


    sendFinancasEntrada(data);


    setNome('');
    setValor('');
    setDataEntrada('');
    setRecorrente(false); 

    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Adicionar Ganho
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Entrada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da entrada"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="valor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor da entrada"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataEntrada">
              <Form.Label>Data de Entrada</Form.Label>
              <Form.Control
                type="date"
                value={dataEntrada}
                onChange={(e) => setDataEntrada(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recorrente">

            <Form.Label>É recorrente? Caso sim, será contabilizado na mesma data todo mês</Form.Label>
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

export default ModalAddGanhos;
