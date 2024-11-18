import React, {useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap';

const EventoModal = ({evento, onClose, onDelete, onUpdate}) => {

    const [eventoEditado, setEventoEditado] = useState({...evento});

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setEventoEditado({...eventoEditado, [name]: value})
    }

    const handleStartDateChange = (e) =>{
        const startDate = new Date(e.target.value);
        if(startDate <= eventoEditado.end){
            setEventoEditado({...eventoEditado, start: startDate})
        }
        
    }
    
    const handleEndDateChange = (e) =>{
        const endDate = new Date(e.target.value);
        if(endDate <= eventoEditado.start){
            setEventoEditado({...eventoEditado, end: endDate})
        }
        
    }

    const handleDelete = () => {
        onDelete(evento.id);

    }

    const handleUpdate = () => {
            onUpdate(eventoEditado);
            onClose();
    }

    const adjustDate = (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - 3);
        return adjustedDate.toISOString().slice(0,-8);
    }

    return(
    <Modal show={true} onHide={onClose}>
        <Modal.Header>
            <Modal.Title>{eventoEditado.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>

                <Form.Group controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name='title' value={eventoEditado.title} onChange={handleInputChange}/>
                </Form.Group>

                <Form.Group controlId="formDesc">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control as="textarea" rows={4} name='desc' value={eventoEditado.desc} onChange={handleInputChange}/>
                </Form.Group>


                    <Form.Group controlId="formStart">
                        <Form.Label>Início</Form.Label>
                        <Form.Control type="datetime-local" name='start' value={adjustDate(eventoEditado.start)} onChange={handleStartDateChange}/>
                    </Form.Group>

                    <Form.Group controlId="formEnd">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="datetime-local" name='end' value={adjustDate(eventoEditado.end)} onChange={handleEndDateChange}/>
                    </Form.Group>

            </Form>
        </Modal.Body>
        
        <Modal.Footer className="justify-content-between"> 
    
            <Button variant="danger" onClick={handleDelete}>
                Apagar
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
                Salvar Alterações
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default EventoModal;
