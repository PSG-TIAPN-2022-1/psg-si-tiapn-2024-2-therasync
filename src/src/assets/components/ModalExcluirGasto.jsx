import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdDelete } from "react-icons/md";

function ModalExcluirGasto({ gasto, onGastoExcluido }) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleExcluir = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/financasSaidas/${gasto?.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Erro ao excluir gasto");
        }
  
        const data = await response.json();
        console.log("excluído:", data);
        alert("Gasto excluído com sucesso!");
        handleClose();
        
        if (onGastoExcluido) {
          onGastoExcluido(gasto.id);
        }
      } catch (error) {
        console.error("Erro ao excluir gasto:", error);
        alert("Erro ao excluir gasto!");
      } finally {
        setLoading(false);
      }
    };
  
    // Adicionando a verificação de segurança no corpo do modal
    return (
      <>
        <Button variant="danger" onClick={handleShow} style={{ width: '40px' }}>
          <MdDelete />
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Excluir Gasto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {gasto ? (
              `Tem certeza que deseja excluir o gasto ${gasto.nome} permanentemente?`
            ) : (
              "Gasto não encontrado."
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleExcluir} disabled={loading}>
              {loading ? 'Excluindo...' : 'Excluir'}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ModalExcluirGasto;