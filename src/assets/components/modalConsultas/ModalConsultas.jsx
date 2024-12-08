import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import './ModalConsultas.css';

function ModalConsultas({ buttonText, data }) {
  const [show, setShow] = useState(false);
  const [valorPago, setValorPago] = useState(""); 

  const handleShow = () => setShow(true);

  const handleClose = async () => {
    const ganho = {
      nome: `consulta ${consulta.nome}`,
      valor: valorPago,
      datacredito: new Date(),
      recorrente: false
    };

    try {
      const response = await fetch('http://localhost:3000/api/financasCreditos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ganho),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar os dados');
      }

      const result = await response.json();
      console.log('Dados salvos com sucesso:', result);
      // Limpa o valor pago após salvar
      setValorPago("");
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pagamento da Consulta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="paymentInput">
              <Form.Label>Quanto foi pago pela consulta?</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o valor pago"
                min="0"
                value={valorPago}
                onChange={(e) => setValorPago(e.target.value)} // Captura o valor do input
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConsultas;