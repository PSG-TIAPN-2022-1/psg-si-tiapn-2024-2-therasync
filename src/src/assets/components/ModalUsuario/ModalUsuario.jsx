import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Cadastro() {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nivel, setNivel] = useState('administrador');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const handleSubmit = async (event) => {
            event.preventDefault();

            const url = 'http://localhost:3000/api/users/register';
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, nivel }),});
        alert('Usuário cadastrado');
        handleClose();
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados da API.');
          handleClose();
      }
    }
    catch (error){
      console.error('Erro ao inserir usuário:', error);
      alert('Erro ao inserir usuário');
      handleClose();
    }
    // Fechar o modal após o envio
    
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adicionar Usuário
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Campo Nome */}
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text"
              placeholder="Digite o nome" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoFocus 
              />
            </Form.Group>

            {/* Campo Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* Campo Senha */}
            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a senha" />
              
            </Form.Group>

            {/* Campo Nível */}
            <Form.Group className="mb-3" controlId="formNivel">
              <Form.Label>Nível</Form.Label>
              <Form.Select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
                aria-label="Selecione o nível">
                <option value="desenvolvedor">desenvolvedor</option>
                <option value="administrador">administrador</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cadastro;
