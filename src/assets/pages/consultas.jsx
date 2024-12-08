import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";

function ModalEditar(props) {
  const { cliente } = props;

  const status = cliente.status; // Assume que o status é booleano
  const [nome, setNome] = useState(cliente?.nome || '');
  const [email, setEmail] = useState(cliente?.email || '');
  const [idade, setIdade] = useState(cliente?.idade || '');
  const [sobre, setSobre] = useState(cliente?.sobre || '');
  const [naturalidade, setNaturalidade] = useState(cliente?.naturalidade || '');
  const [frequenciaPagamento, setFrequenciaPagamento] = useState(cliente?.frequenciaPagamento || '');
  const [nomeResponsavel, setNomeResponsavel] = useState(cliente?.nomeResponsavel || '');
  const [statusCliente, setStatusCliente] = useState(status); // Estado para o status do cliente
  
  const [clienteEditado, setClienteEditado] = useState({});
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAlter = () => {
    const novoCliente = {
      nome,
      email,
      idade,
      sobre,
      naturalidade,
      frequenciaPagamento,
      nomeResponsavel,
      status: statusCliente, // Usa o novo estado para o status
    };

    setClienteEditado(novoCliente);
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/pacientes/${cliente.cpf}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clienteEditado),
        });

        if (!response.ok) {
          alert("sem resposta");
          throw new Error("Erro ao atualizar o paciente");
        }

        const data = await response.json();
        console.log("Paciente atualizado:", data);
        alert("Paciente atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar paciente:", error);
        alert("Erro ao atualizar paciente!");
      }
    };

    if (Object.keys(clienteEditado).length > 0) {
      fetchClientes();
    }
  }, [clienteEditado]);

  return (
    <>
      <Button variant="success" onClick={handleShow} style={{ width: '50px' }}>
       <FaEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCpf">
              <Form.Label>CPF: {cliente ? cliente.cpf : ''}</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                maxLength="50"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email"
                maxLength="50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIdade">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSobre">
              <Form.Label>Sobre</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Informações adicionais"
                maxLength="500"
                value={sobre}
                onChange={(e) => setSobre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNaturalidade">
              <Form.Label>Naturalidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a naturalidade"
                maxLength="32"
                value={naturalidade}
                onChange={(e) => setNaturalidade(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFrequenciaPagamento">
              <Form.Label>Frequência de Pagamento</Form.Label>
              <Form.Control
                as="select"
                value={frequenciaPagamento}
                onChange={(e) => setFrequenciaPagamento(e.target.value)}
              >
                <option value="mensal">Mensal</option>
                <option value="quinzenal">Quinzenal</option>
                <option value="semanal">Semanal</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNomeResponsavel">
              <Form.Label>Nome do Responsável</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do responsável"
                maxLength="50"
                value={nomeResponsavel}
                onChange={(e) => setNomeResponsavel(e.target.value)}
              />
            </Form.Group>

            {/* Radio buttons para status */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check 
                  type="radio"
                  label="Ativo"
                  checked={statusCliente === true}
                  onChange={() => setStatusCliente(true)} 
                />
                <Form.Check 
                  type="radio"
                  label="Inativo"
                  checked={statusCliente === false}
                  onChange={() => setStatusCliente(false)} 
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAlter}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditar;
