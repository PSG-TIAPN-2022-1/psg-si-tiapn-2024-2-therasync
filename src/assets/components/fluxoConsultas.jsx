import GraficoCreditos from '../components/GraficoPizzaGanhos/PizzaGanhos.jsx';
import MyBarChart from '../components/GraficoBarras/barras.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { FcBarChart } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { useState , useEffect} from 'react';
import { FcMoneyTransfer } from "react-icons/fc";

function fluxoConsultas({periodo}){
    const [consultas, setConsultas] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/pacientes')
            if (!response.ok) {
              throw new Error(`Erro na resposta da API: ${response.status}`);
            }
            const data = await response.json();
            setClientes(data);
          } catch (error) {
            console.error("Erro ao buscar clientes:", error);
          }
        };
        fetchClientes();
      }, []);

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

    const faturamento = () => {
        return consultas
            .filter((consulta) => {
                // Converte a string de data em objeto Date
                const dataConsulta = new Date(consulta.dataconsulta);
    
                // Verifica se a conversão foi bem-sucedida
                return (
                    dataConsulta.getMonth() >= periodo.mes &&
                    dataConsulta.getFullYear() >= periodo.ano
                );
            })
            .reduce((soma, consulta) => soma + consulta.valorpago, 0); 
    };

    
    const ativos = clientes.filter(cliente => cliente.status ).length;
      
  
      
    const inativos = clientes.filter(cliente => !cliente.status).length;
     
  
    
    const numeroConsultas = () => {
        return consultas.filter((consulta) => {
            // Converte a string de data em objeto Date
            const dataConsulta = new Date(consulta.dataconsulta);

            // Verifica se a conversão foi bem-sucedida
            return (
                dataConsulta.getMonth() >= periodo.mes &&
                dataConsulta.getFullYear() >= periodo.ano
            );
        }).length;
    } 

    const consultaCara = () => {
        const consultasF = consultas.filter((consulta) => {
            // Converte a string de data em objeto Date
            const dataConsulta = new Date(consulta.dataconsulta);
    
            // Verifica se a conversão foi bem-sucedida
            return (
                dataConsulta.getMonth() >= periodo.mes &&
                dataConsulta.getFullYear() >= periodo.ano
            );
        });
    
        // Calcular o valor máximo
        return consultasF.reduce((max, consulta) => {
            return Math.max(max, consulta.valorpago);
        }, 0); // Inicializa o valor máximo com 0

    };


    return (
        <div className="thirdSection">
            <div className="consultasMetricas">
                <p>Faturamento por consultas:</p>
                <li>
                    <FcCurrencyExchange style={{ fontSize: '36px' }} />

                    <h3>{faturamento()}</h3>
                </li>
                <li><FcBarChart style={{ fontSize: '36px' }} />Consultas Realizadas: {numeroConsultas()}</li>
                <li><FcMoneyTransfer style={{ fontSize: '36px' }} />Consulta Mais Cara: {consultaCara()}</li>

                <p>Clientes:</p>
                <li><FcOk style={{ fontSize: '36px' }} /><p>Ativos: {ativos}</p></li>
                <li><FcCancel style={{ fontSize: '36px' }} />Inativos: {inativos}</li>
                

            </div>
            <div className="barras">
                <MyBarChart />
                <div className='footerBarras' periodo={periodo}>
                    <p>Adicionais</p>
                </div>
            </div>
        </div>

    )
}

export default fluxoConsultas;