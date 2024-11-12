import React from 'react';
import { Button, Modal } from 'react-bootstrap';

// Função para calcular idade a partir da data de nascimento
const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return '—';
    
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
  
    return idade;
  };

export default function ModalCliente(props) {
  const { cliente } = props;

    const idade = calcularIdade(cliente?.idade);
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {cliente ? cliente.nome : 'Detalhes do Cliente'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Informações do Cliente</h4>
        <p><strong>CPF:</strong> {cliente?.cpf || '—'} </p>
        
        <p><strong>Email:</strong> {cliente?.email || '—'}</p>
        <p><strong>Idade:</strong> {idade || '—'}</p>
        <p><strong>Sobre:</strong> {cliente?.sobre || '—'}</p>
        <p><strong>Naturalidade:</strong> {cliente?.naturalidade || '—'}</p>
        <p><strong>Frequência de Pagamento:</strong> {cliente?.frequenciaPagamento || '—'}</p>
        {cliente?.idade < 18 && (
          <p><strong>Nome do Responsável:</strong> {cliente.nomeResponsavel || '—'}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
