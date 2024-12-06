import React, { useState } from "react";
import "../styles/consultas.css";
import { Button } from "react-bootstrap";
import ModalConsultas from "../components/modalConsultas/ModalConsultas";
import { FaEdit } from "react-icons/fa";

export default function Consultas() {
    const [pacientes, setPacientes] = useState([
        { id: 1, nome: "João Silva", horario: "10:00", status: false, cancelada: false, valorPago: 0 },
        { id: 2, nome: "Maria Oliveira", horario: "11:30", status: true, cancelada: false, valorPago: 150 },
        { id: 3, nome: "Carlos Almeida", horario: "14:00", status: false, cancelada: true, valorPago: 0 },
        { id: 4, nome: "Ana Santos", horario: "15:30", status: true, cancelada: false, valorPago: 200 },
        { id: 5, nome: "Pedro Costa", horario: "16:00", status: false, cancelada: false, valorPago: 0 },
        { id: 6, nome: "Lucia Pereira", horario: "09:00", status: true, cancelada: false, valorPago: 120 },
        { id: 7, nome: "Fernando Lima", horario: "10:30", status: false, cancelada: false, valorPago: 0 },
        { id: 8, nome: "Tatiane Souza", horario: "11:00", status: true, cancelada: false, valorPago: 180 },
        { id: 9, nome: "Roberto Dias", horario: "12:30", status: false, cancelada: false, valorPago: 0 },
        { id: 10, nome: "Renata Nascimento", horario: "13:00", status: true, cancelada: false, valorPago: 160 },
        { id: 11, nome: "Rafael Martins", horario: "09:30", status: false, cancelada: true, valorPago: 0 },
        { id: 12, nome: "Juliana Alves", horario: "10:15", status: true, cancelada: false, valorPago: 140 },
        { id: 13, nome: "Gustavo Rocha", horario: "11:45", status: false, cancelada: false, valorPago: 0 },
        { id: 14, nome: "Claudia Teixeira", horario: "12:15", status: true, cancelada: false, valorPago: 220 },
        { id: 15, nome: "Sérgio Gomes", horario: "14:30", status: false, cancelada: true, valorPago: 0 },
        { id: 16, nome: "Viviane Costa", horario: "15:00", status: true, cancelada: false, valorPago: 130 },
        { id: 17, nome: "André Lima", horario: "16:30", status: false, cancelada: false, valorPago: 0 },
        { id: 18, nome: "Aline Mendes", horario: "17:00", status: true, cancelada: false, valorPago: 190 },
        { id: 19, nome: "Tiago Ferreira", horario: "08:30", status: false, cancelada: true, valorPago: 0 },
        { id: 20, nome: "Priscila Santos", horario: "09:45", status: true, cancelada: false, valorPago: 170 },
        { id: 21, nome: "Célia Araújo", horario: "10:45", status: false, cancelada: false, valorPago: 0 },
        { id: 22, nome: "Julio Pires", horario: "11:15", status: true, cancelada: false, valorPago: 200 },
        { id: 23, nome: "Lara Ribeiro", horario: "12:00", status: false, cancelada: false, valorPago: 0 },
        { id: 24, nome: "Marcos Paulo", horario: "13:30", status: true, cancelada: false, valorPago: 210 },
        { id: 25, nome: "Daniela Brito", horario: "14:45", status: false, cancelada: true, valorPago: 0 },
        { id: 26, nome: "Eduardo Mota", horario: "15:15", status: true, cancelada: false, valorPago: 155 },
        { id: 27, nome: "Fabiana Lima", horario: "09:15", status: false, cancelada: false, valorPago: 0 },
        { id: 28, nome: "Felipe Andrade", horario: "10:00", status: true, cancelada: false, valorPago: 175 },
        { id: 29, nome: "Ingrid Costa", horario: "11:30", status: false, cancelada: false, valorPago: 0 },
        { id: 30, nome: "Carlos Mendes", horario: "12:45", status: true, cancelada: false, valorPago: 190 },
        { id: 31, nome: "Veronica Pinto", horario: "13:15", status: false, cancelada: true, valorPago: 0 },
        { id: 32, nome: "Lucas Martins", horario: "14:00", status: true, cancelada: false, valorPago: 130 },
        { id: 33, nome: "Tatiane Ribeiro", horario: "15:00", status: false, cancelada: false, valorPago: 0 },
        { id: 34, nome: "Adriana Oliveira", horario: "16:30", status: true, cancelada: false, valorPago: 120 },
        { id: 35, nome: "Natália Ferreira", horario: "09:30", status: false, cancelada: true, valorPago: 0 },
        { id: 36, nome: "Cláudio Nascimento", horario: "10:15", status: true, cancelada: false, valorPago: 200 },
        { id: 37, nome: "Patrícia Souza", horario: "11:00", status: false, cancelada: false, valorPago: 0 },
        { id: 38, nome: "Gabriel Silva", horario: "12:00", status: true, cancelada: false, valorPago: 150 },
        { id: 39, nome: "Leandro Rocha", horario: "13:30", status: false, cancelada: true, valorPago: 0 },
        { id: 40, nome: "Simone Almeida", horario: "14:15", status: true, cancelada: false, valorPago: 160 },
        { id: 41, nome: "Monique Lima", horario: "15:30", status: false, cancelada: false, valorPago: 0 },
        { id: 42, nome: "Ricardo Pires", horario: "09:45", status: true, cancelada: false, valorPago: 190 },
        { id: 43, nome: "Tânia Araújo", horario: "10:30", status: false, cancelada: true, valorPago: 0 },
        { id: 44, nome: "Thiago Gomes", horario: "11:15", status: true, cancelada: false, valorPago: 200 },
        { id: 45, nome: "Sofia Costa", horario: "12:00", status: false, cancelada: false, valorPago: 0 },
        { id: 46, nome: "Jéssica Oliveira", horario: "13:30", status: true, cancelada: false, valorPago: 170 },
        { id: 47, nome: "Mariana Lima", horario: "14:15", status: false, cancelada: true, valorPago: 0 },
        { id: 48, nome: "Eduardo Almeida", horario: "15:00", status: true, cancelada: false, valorPago: 150 },
        { id: 49, nome: "Henrique Costa", horario: "09:00", status: false, cancelada: false, valorPago: 0 },
        { id: 50, nome: "Barbara Ferreira", horario: "10:30", status: true, cancelada: false, valorPago: 220 },
        { id: 51, nome: "Roberta Silva", horario: "11:00", status: false, cancelada: false, valorPago: 0 },
        { id: 52, nome: "Victor Nascimento", horario: "12:30", status: true, cancelada: false, valorPago: 130 },
        { id: 53, nome: "Silvia Teixeira", horario: "13:00", status: false, cancelada: true, valorPago: 0 },
        { id: 54, nome: "Gustavo Lima", horario: "14:30", status: true, cancelada: false, valorPago: 180 },
        { id: 55, nome: "Marcio Almeida", horario: "15:15", status: false, cancelada: false, valorPago: 0 }])
      
  
    // Função de clique do botão
    const handleButtonClick = (id) => {
      // Atualiza o estado para marcar o paciente como "cancelada: true"
      setPacientes((prevPacientes) =>
        prevPacientes.map((paciente) =>
          paciente.id === id ? { ...paciente, cancelada: true } : paciente
        )
      );
    };

    const [consultaFeita, setConsultaFeita] = useState(true);

  
    return (
        <div className="container">
            <p id="titulo_container">Consultas</p>
    
            <h4>A revisar</h4>
            <table className="table-pacientes">
                <thead>
                    <tr>
                        <th>Horário</th>
                        <th>Nome</th>
                        <th>Cancelada</th>
                        <th>Realizada</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes
                        .filter((paciente) => !paciente.status) // Filtra por status
                        .map((paciente) => (
                            <tr key={paciente.id} className="paciente-item">
                                <td className="paciente-dados">{paciente.horario}</td>
                                <td className="paciente-dados">{paciente.nome}</td>
                                <td>
                                    <Button
                                        style={{ width: "100px", backgroundColor: "#bd0c0c" }}
                                        className="paciente-botao"
                                        onClick={() => handleButtonClick(paciente.id)}
                                    >
                                        Cancelar
                                    </Button>
                                    
                                </td>
                                <td>
                                <ModalConsultas buttonText={"Realizada"} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
    
            {/* Botões separados */}
            <div className="Botões-FC">
                <Button className="btn btn-success" onClick={() => setConsultaFeita(true)}>
                    Feitas
                </Button>
                <Button className="btn btn-danger" onClick={() => setConsultaFeita(false)}>
                    Canceladas
                </Button>
            </div>
    
            {consultaFeita ? <h4>Consultas feitas</h4> : <h4>Consultas Canceladas</h4>}
            <table className="table-pacientes">
                <thead>
                    <tr>
                        <th>Horário</th>
                        <th>Nome</th>
                        <th>Valor Pago</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes
                        .filter((paciente) => consultaFeita ? paciente.status === true : paciente.cancelada === true) // Filtra por status 
                        .map((paciente) => (
                            <tr key={paciente.id} className="pacienteFC-item">
                                <td className="FC-dados">{paciente.horario}</td>
                                <td className="FC-dados">{paciente.nome}</td>
                                <td className="FC-dados">R$ {paciente.valorPago}</td>
                                <td>
                                    <ModalConsultas buttonText={"Editar"} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
    
  }