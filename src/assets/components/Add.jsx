import { useState } from "react";
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap';

function Add({ onAdd }) {
    const [novoEvento, setNovoEvento] = useState({
        cpf: '',
        observacoesconsultas: '',
        dataconsulta: '',
    });

    const [expanded, setExpanded] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoEvento({ ...novoEvento, [name]: value });
    };

    const handleToggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (novoEvento.cpf && novoEvento.observacoesconsultas && novoEvento.dataconsulta) {
            const startDate = new Date(novoEvento.dataconsulta);  // 
            if (isNaN(startDate)) {
                alert('Data inválida');
                return;
            }
            const formattedDate = startDate.toISOString();
        

            try {
                const response = await fetch('http://localhost:3000/api/consultas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_paciente: novoEvento.cpf,
                        observacoesconsultas: novoEvento.observacoesconsultas,
                        dataconsulta: formattedDate,
                    }),
                });
    
                if (response.ok) {
                    alert('Evento adicionado com sucesso');
                    const data = await response.json();
                    onAdd(data);
                    setNovoEvento({
                        cpf: '',
                        observacoesconsultas: '',
                        dataconsulta: '',
                    });
                } else {
                    alert('Erro ao adicionar evento');
                }
            } catch (error) {
                alert('Erro na conexão com a API');
            }
        } else {
            alert('Preencha todos os campos obrigatórios');
        }
    };
    

    return (
        <div className="adicionar p-3 rounded border border-white">
            <Collapse in={expanded}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicCpf">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o CPF"
                            name="cpf"
                            value={novoEvento.cpf}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="formBasicStart">
                                <Form.Label>Data da Consulta</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="dataconsulta"
                                    value={novoEvento.dataconsulta}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formBasicObservacoes">
                                <Form.Label>Observações</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Observações da consulta"
                                    name="observacoesconsultas"
                                    value={novoEvento.observacoesconsultas}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        variant="success"
                        type="submit"
                        style={{ marginTop: '20px', width: '150px' }}
                        disabled={!novoEvento.cpf || !novoEvento.dataconsulta || !novoEvento.observacoesconsultas}
                    >
                        Salvar
                    </Button>
                </Form>
            </Collapse>

            <Button
                variant="primary"
                type="button"
                onClick={handleToggleExpanded}
                style={{ marginTop: '10px', float: 'right' }}
            >
                Adicionar Evento
                {expanded ? <i className="bi bi-chevron-double-up"></i> : <i className="bi bi-chevron-double-down"></i>}
            </Button>
        </div>
    );
}

export default Add;
