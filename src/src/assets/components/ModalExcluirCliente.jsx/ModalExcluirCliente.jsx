import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdDelete } from "react-icons/md";

function ModalExcluirCliente({ cliente, onClienteExcluido }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleExcluir = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/pacientes/${cliente.cpf}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir o paciente");
      }

      const data = await response.json();
      console.log("Paciente excluído:", data);
      alert("Paciente excluído com sucesso!");

      // Chamar função de callback para atualizar a lista
      if (onClienteExcluido) {
        onClienteExcluido(cliente.cpf);
      }

      handleClose(); // Fecha o modal após a exclusão
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      alert("Erro ao excluir paciente!");
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow} style={{ width: '40px' }}>
        <MdDelete />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir {cliente.nome} permanentemente?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleExcluir}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExcluirCliente;
