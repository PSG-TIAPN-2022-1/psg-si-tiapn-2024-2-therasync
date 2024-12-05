import React from 'react';
import '../styles/consultas.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Consultas() {

    const [pacientes, setPacientes] = useState([
        { id: 1, nome: "João Silva", horario: "10:00" },
        { id: 2, nome: "Maria Oliveira", horario: "11:30" },
        { id: 3, nome: "Carlos Almeida", horario: "14:00" },
      ]);
    
      const handleButtonClick = (id) => {
        alert(`Botão clicado para o paciente com ID: ${id}`);
      };


  return (
    <div className='container'>
        <p id='titulo_container'>Consultas</p>

        <div className="paciente-list">
            {pacientes.map((paciente) => (
        <div key={paciente.id} className="paciente-item">
          <span className="paciente-horario">{paciente.horario}</span>
          <span className="paciente-nome">{paciente.nome}</span>
        <Button style={{ width: '100px', backgroundColor: '#bd0c0c'}}  className="paciente-botao" onClick={() => handleButtonClick(paciente.id)}>
                Cancelada
        </Button>
        </div>
      ))}
    </div>
    </div>
  )
}
