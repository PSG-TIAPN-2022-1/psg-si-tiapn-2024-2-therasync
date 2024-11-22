import { useState } from "react";
import {Button, Form, Row, Col, Collapse} from 'react-bootstrap';

function Add({onAdd}){

    const [novoEvento, setNovoEvento] = useState({
        title: '',
        start: '', 
        end: '',
        desc: '',
    });

    const[expanded, setExpanded] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNovoEvento({...novoEvento, [name]: value });
    }

    const handleToggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded)

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(novoEvento.title && novoEvento.start && novoEvento.end){
            const startDate = new Date(novoEvento.start);
            const endDate = new Date(novoEvento.end);

            if(startDate >= endDate){
                alert('A data de início deve ser anterior a data de Término');
                return;
            }
            onAdd(novoEvento);
            setNovoEvento({
                title: '',
                start: '', 
                end: '',
                desc: ''
            })
        }
    }


    return(
        
        <div lassName="adicionar p-3 rounded border border-white"> 
            <Collapse in={expanded}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group  controlId='fromBasicTitle'>
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" placeholder="Digite um título" name="title" value={novoEvento.title} onChange={handleChange} />
                    </Form.Group>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId='formBasicStart'>
                                <Form.Label>Início</Form.Label>
                                <Form.Control type="datetime-local" name="start" value={novoEvento.start} onChange={handleChange}/>
                            </Form.Group >
                        </Col>
                        <Col xs ={6}>
                            <Form.Group controlId='formBasicEnd'>
                                <Form.Label>Fim</Form.Label>
                                <Form.Control type="datetime-local" name="end" value={novoEvento.end} onChange={handleChange}/>
                            </Form.Group >
                        </Col>
                    </Row>  
                    
                        <div>
                            <div>
                                <Form.Group controlId="formBasicDesc">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control type="text" placeholder="Descrição" name="desc" value={novoEvento.desc} onChange={handleChange}></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <Button
                        variant='success'
                        type='submit'
                        style={{marginTop: '20px',  width: '150px'}}
                        disabled={!novoEvento.title || !novoEvento.start || !novoEvento.end}
                        >
                            Salvar
                        </Button>
                </Form>
            </Collapse>
           
            <Button
                variant="primary"
                type="button"
                onClick={handleToggleExpanded} 
                style={{marginTop: '10px', float: 'right'}}
                > Adicionar Evento 
                {expanded ? <i className="bi bi-chevron-double-up"></i>: <i class="bi bi-chevron-double-down"></i>}
            </Button>

            
        </div>
    )
}

export default Add;