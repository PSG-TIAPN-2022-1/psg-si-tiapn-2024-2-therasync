import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MdEdit } from "react-icons/md";

function ModalEditar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <MdEdit></MdEdit>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text" placeholder="Digite o CPF" maxLength="11" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome" maxLength="50" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite o email" maxLength="50" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIdade">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSobre">
              <Form.Label>Sobre</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Informações adicionais" maxLength="500" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNaturalidade">
              <Form.Label>Naturalidade</Form.Label>
              <Form.Control type="text" placeholder="Digite a naturalidade" maxLength="32" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFrequenciaPagamento">
              <Form.Label>Frequência de Pagamento</Form.Label>
              <Form.Control as="select">
                <option value="">Selecione...</option>
                <option value="mensal">Mensal</option>
                <option value="quinzenal">Quinzenal</option>
                <option value="semanal">Semanal</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNomeResponsavel">
              <Form.Label>Nome do Responsável</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome do responsável" maxLength="50" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUltimaConsulta">
              <Form.Label>Última Consulta</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProximaConsulta">
              <Form.Label>Próxima Consulta</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditar;