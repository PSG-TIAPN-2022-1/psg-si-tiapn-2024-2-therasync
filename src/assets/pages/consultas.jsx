import React, { useEffect, useState } from "react";
import "../styles/consultas.css";
import { Button } from "react-bootstrap";
import ModalConsultas from "../components/modalConsultas/ModalConsultas";

export default function Consultas() {
    const [consultas, setConsultas] = useState([]);
    const [consultaFeita, setConsultaFeita] = useState(true);

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/consultas");

                if (!response.ok) {
                    throw new Error(`Erro na resposta da API: ${response.status}`);
                }

                const data = await response.json();
                setConsultas(data);
            } catch (error) {
                console.error("Erro ao buscar consultas:", error);
            }
        };
        fetchConsultas();
    }, []);

    // Consultas pendentes (não canceladas e não realizadas)
    const consultasPendentes = consultas.filter(
        (consulta) => !consulta.status && !consulta.cancelada
    );

    // Função para formatar a data e retornar apenas o horário
    const formatarHorario = (dataConsulta) => {
        const data = new Date(dataConsulta);
        return data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };


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
                    {consultasPendentes.map((consulta) => (
                        <tr key={consulta.id} className="paciente-item">
                            <td className="paciente-dados">{formatarHorario(consulta.dataconsulta)}</td>
                            <td className="FC-dados">{consulta.nome}</td>
                            <td>
                                <Button
                                    style={{ width: "100px", backgroundColor: "#bd0c0c" , border:'none'}}
                                    className="paciente-botao"
                                    onClick={() => handleButtonClick(consulta.id)}
                                >
                                    Cancelar
                                </Button>
                            </td>
                            <td>
                                <ModalConsultas buttonText="Realizada" data={consulta} />
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
                    </tr>
                </thead>
                <tbody>
                    {consultas
                        .filter((consulta) =>
                            consultaFeita ? consulta.status : consulta.cancelada
                        )
                        .map((consulta) => (
                            <tr key={consulta.codconsulta} className="pacienteFC-item">
                                <td className="FC-dados">{formatarHorario(consulta.dataconsulta)}</td>
                                <td className="FC-dados">{consulta.nome}</td>
                                <td className="FC-dados">R$ {consulta.valorpago}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}