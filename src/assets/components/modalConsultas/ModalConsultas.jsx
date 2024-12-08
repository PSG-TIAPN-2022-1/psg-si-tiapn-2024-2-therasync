import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ModalConsultas = ({ buttonText, data }) => {
  const [show, setShow] = useState(false);
<<<<<<< HEAD
  const [valorPago, setValorPago] = useState(""); 
=======
  const [valorPago, setValorPago] = useState(0);
  const [error, setError] = useState("");
>>>>>>> f4178cdec14c580da75974b10e7534389b5a1e7e

  const handleShow = () => setShow(true);
  const handleClose = async () => {
    if (valorPago <= 0) {
      setError("O valor pago deve ser maior que zero.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/consultas/atualizar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codconsulta: data.codconsulta,
          status: true, 
          valorpago: valorPago,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar consulta");
      }

      const result = await response.json();
      console.log(result.message);

      // Fechar o modal e limpar o campo de erro
      setShow(false);
      setError("");
    } catch (error) {
      setError("Erro ao salvar o pagamento.");
      console.error("Erro:", error);
    }
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
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Form>
            <Form.Group className="mb-3" controlId="paymentInput">
              <Form.Label>Quanto foi pago pela consulta?</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o valor pago"
                min="0"
                value={valorPago}
                onChange={(e) => setValorPago(e.target.value)}
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
};

export default ModalConsultas;
