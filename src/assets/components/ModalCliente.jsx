import React from 'react';
import { Button,Modal } from 'react-bootstrap';

export default function ModalCliente(props) {

const cliente = props;

  return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {cliente.nome}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Informações do Cliente</h4>
            <p><strong>CPF:</strong> {cliente.cpf}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Idade:</strong> {cliente.idade}</p>
            <p><strong>Sobre:</strong> {cliente.sobre}</p>
            <p><strong>Naturalidade:</strong> {cliente.naturalidade}</p>
            <p><strong>Frequência de Pagamento:</strong> {cliente.frequenciaPagamento}</p>
            {cliente.idade < 18 
                ? <><strong>Nome do Responsável:</strong> {cliente.nomeResponsavel}</> 
                : <p></p>
            }
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
}
