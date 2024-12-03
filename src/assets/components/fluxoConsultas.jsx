import GraficoCreditos from '../components/GraficoPizzaGanhos/PizzaGanhos.jsx';
import MyBarChart from '../components/GraficoBarras/barras.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { FcBarChart } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";

function fluxoConsultas(){

    return (
        <div className="thirdSection">
            <div className="consultasMetricas">
                <p>Faturamento por consultas:</p>
                <li>
                    <FcCurrencyExchange style={{ fontSize: '36px' }} />

                    <h3>234,00</h3>
                </li>
                <li><FcBarChart style={{ fontSize: '36px' }} />Consultas Realizadas: 6</li>

                <p>Clientes:</p>
                <li><FcOk style={{ fontSize: '36px' }} /><p>Ativos: 23</p></li>
                <li><FcCancel style={{ fontSize: '36px' }} />Inativos: 67</li>

            </div>
            <div className="barras">
                <MyBarChart />
                <div className='footerBarras'>
                    <p>Adicionais</p>
                </div>
            </div>
        </div>

    )
}

export default fluxoConsultas;