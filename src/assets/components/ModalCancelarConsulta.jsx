import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalCancelarConsulta = ({ buttonText, data }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const cancelarConsulta = async () => {
    const url = `http://localhost:3000/api/consulta/${data.codconsulta}`; 

    
    const dadosAtualizados = {
      pacienteCpf: data.pacienteCpf,
      observacoesconsultas: data.observacoesconsultas,
      dataconsulta: data.dataconsulta,
      status: false, // Consulta não está mais ativa
      cancelada: true, // Consulta cancelada
      valorpago: data.valorpago, 
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
        throw new Error(`Erro ao cancelar consulta: ${resposta.status}`);
      }

      const dados = await resposta.json();
      console.log("Consulta cancelada com sucesso:", dados);
      setShow(false); // Fecha o modal ao concluir
      return dados;
    } catch (erro) {
      console.error("Erro no fetch:", erro);
      setError("Não foi possível cancelar a consulta.");
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow} style={{ width: "100px", border: 'none' }}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelar Consulta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <p>Tem certeza de que deseja cancelar esta consulta?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não, voltar
          </Button>
          <Button variant="danger" onClick={cancelarConsulta}>
            Sim, cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCancelarConsulta;