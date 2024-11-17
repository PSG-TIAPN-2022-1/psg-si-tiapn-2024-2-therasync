import { useState, useEffect } from 'react'; // Adicione o useEffect aqui
import '../styles/lembretes.css';
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineViewAgenda } from 'react-icons/md';
import { MdDelete } from "react-icons/md";
import { Button } from 'react-bootstrap';

function Lembretes() {

  const now = new Date();
  const hours = now.getHours();
  const saudacao =
    hours < 12 ? 'Bom dia' : hours < 18 ? 'Boa tarde' : 'Boa noite';

  const [isVisible, setIsVisible] = useState(false);

  const togglePanel = () => {
    setIsVisible(prevState => !prevState);
  };

  const [consultas, setConsultas] = useState([]);
  const [consultasDia, setConsultasDia] = useState([]);

  const fetchConsultas = async () => {
    try {
      const response = await fetch('/api/consultas');
      if (!response.ok) {
        throw new Error('Erro ao buscar consultas');
      }
      const data = await response.json();
      setConsultas(data);
    } catch (error) {
      console.error('Erro ao fazer o fetch:', error);
    }
  };

  useEffect(() => {
    fetchConsultas();

    const FiltrarConsultas = () => {
      const hoje = new Date();
      const dia = consultas.filter(consulta => {
        const dataConsulta = new Date(consulta.dataConsulta);
        return dataConsulta.toLocaleDateString() === hoje.toLocaleDateString();
      });
      setConsultasDia(dia);
    };

    FiltrarConsultas();
  }, [consultas]); // O useEffect agora depende de 'consultas' para filtrar as consultas após o fetch

  return (
    <>
      <button className="toggleButton" onClick={togglePanel}>
        {isVisible ? <IoCloseSharp size={24} /> : <MdOutlineViewAgenda size={24} />}
      </button>
      <div className={`lembretes_container ${isVisible ? 'active' : ''}`}>
        <div className="render_lembretes">
          <div className="div_user">
            <p>Olá, {saudacao}</p>
          </div>
          <div className="consultasDia">
            <h3>CONSULTAS</h3>
            <div className="dados_consulta">
              {consultasDia.map((consulta, index) => (
                <p key={index}>{new Date(consulta.dataConsulta).toLocaleTimeString()}<MdDelete size={24} className="icon-hover" /> - Cliente: {consulta.id_paciente} </p>
              ))}
            </div>
          </div>
          <div className="Lembretes">
            <h3>LEMBRETES</h3>
            <div className="div_addLembrete">
              <input 
                type="text" 
                className="input_lembrete" 
                placeholder="Adicionar lembrete" 
              />
              <button type="button" className="btn_addLembrete">
                <IoMdAdd size={20} />
              </button>
            </div>
            <div className="lembretes_atuais">
              <p><MdDelete size={24} className="icon-hover" /> Lembrete 1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lembretes;
