import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ModalConsultas = ({ buttonText, data }) => {
  const [show, setShow] = useState(false);
  const [valorPago, setValorPago] = useState(data.valorpago || 0); // Valor inicial vindo dos dados
  const [error, setError] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  /* Rota para definir valor e consulta feita */
  const atualizarConsulta = async () => {
    const url = `http://localhost:3000/api/consulta/${data.codconsulta}`; // Substitua pela URL correta da sua API

    // Atualiza apenas os campos necessários, mas envia todos os dados
    const dadosAtualizados = {
      pacienteCpf: data.pacienteCpf,
      observacoesconsultas: data.observacoesconsultas,
      dataconsulta: data.dataconsulta,
      status: true, // Campo alterado
      cancelada: data.cancelada,
      valorpago: parseFloat(valorPago), // Campo alterado
    };

    try {
      const resposta = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!resposta.ok) {
        throw new Error(`Erro ao atualizar consulta: ${resposta.status}`);
      }

      const dados = await resposta.json();
      console.log("Consulta atualizada com sucesso:", dados);

      // Após atualizar a consulta, cria um ganho
      await sendFinancasEntrada();

      setShow(false); // Fecha o modal ao concluir
      return dados;
    } catch (erro) {
      console.error("Erro no fetch:", erro);
      setError("Não foi possível atualizar a consulta.");
    }
  };

  /* Rota para criar ganho */
  const sendFinancasEntrada = async () => {
    const nome = data.nome;
    const valor = parseFloat(valorPago);
    const dataEntrada = data.dataconsulta;
    const recorrente = false;

    const ganho =  {
      nome,
      valor,
      dataEntrada,
      recorrente,
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
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ width: "100px"}}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={atualizarConsulta}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConsultas;

