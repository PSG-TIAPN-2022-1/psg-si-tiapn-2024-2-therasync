import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function NovoCliente() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Estado para armazenar os dados do novo cliente
  const [novoCliente, setNovoCliente] = useState({
    cpf: '',
    nome: '',
    email: '',
    idade: '',
    sobre: '',
    naturalidade: '',
    frequenciaPagamento: '',
    nomeResponsavel: ''
  });

  // Função para capturar os valores dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;  // Corrigido para "name"
    setNovoCliente({
      ...novoCliente,
      [name]: value  // Corrigido para usar "name"
    });
  };

  const handleSubmit = () => {
    alert(novoCliente.naturalidade)
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Cadastrar Cliente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o CPF"
                maxLength="11"
                name="cpf"
                value={novoCliente.cpf}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                maxLength="50"
                name="nome"
                value={novoCliente.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email"
                maxLength="50"
                name="email"
                value={novoCliente.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIdade">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="idade"
                value={novoCliente.idade}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSobre">
              <Form.Label>Sobre</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Informações adicionais"
                maxLength="500"
                name="sobre"
                value={novoCliente.sobre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNaturalidade">
              <Form.Label>Naturalidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a naturalidade"
                maxLength="32"
                name="naturalidade"
                value={novoCliente.naturalidade}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFrequenciaPagamento">
              <Form.Label>Frequência de Pagamento</Form.Label>
              <Form.Control
                as="select"
                name="frequenciaPagamento"
                value={novoCliente.frequenciaPagamento}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="mensal">Mensal</option>
                <option value="quinzenal">Quinzenal</option>
                <option value="semanal">Semanal</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNomeResponsavel">
              <Form.Label>Nome do Responsável</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do responsável (opcional)"
                maxLength="50"
                name="nomeResponsavel"
                value={novoCliente.nomeResponsavel}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => handleSubmit()}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NovoCliente;