import React, { useEffect, useState } from "react";
import "../styles/consultas.css";
import { Button } from "react-bootstrap";
import ModalConsultas from "../components/modalConsultas/ModalConsultas";

export default function Consultas() {
    const [consultas, setConsultas] = useState([])

    useEffect(() => {
        const fetchConsultas = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/consultas');

                if(!response.ok){
                    throw new Error(`Erro na resposta da API: ${response.status}`);
                }

                const data = await response.json();
                setConsultas(data);
            }catch(error){
                console.error("Erro ao buscar consultas:", error);
            }
        }
        fetchConsultas();
    }, []);
      
  
    // Função de clique do botão
    const handleButtonClick = () => {

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
                    {consultas
                        .filter((consulta) => !consulta.status) // Filtra por status
                        .map((consulta) => (
                            <tr key={consulta.id} className="paciente-item">
                                <td className="paciente-dados">{consulta.dataconsulta}</td>
                                <td className="paciente-dados">{consulta.paciente.nome}</td>
                                <td>
                                    <Button
                                        style={{ width: "100px", backgroundColor: "#bd0c0c" }}
                                        className="paciente-botao"
                                        onClick={() => handleButtonClick(consulta.id)}
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
                    {consultas
                        .filter((consulta) => consultaFeita ? paciente.status === true : paciente.cancelada === true) // Filtra por status 
                        .map((consulta) => (
                            <tr key={consulta.id} className="pacienteFC-item">
                                <td className="FC-dados">{consulta.dataconsulta}</td>
                                <td className="FC-dados">{consulta.paciente.nome}</td>
                                <td className="FC-dados">R$ {consulta.valorpago}</td>
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