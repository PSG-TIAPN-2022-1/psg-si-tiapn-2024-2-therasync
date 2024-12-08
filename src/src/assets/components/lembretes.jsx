import React, { useState , useEffect} from 'react'; // Importando useState
import '../styles/lembretes.css';
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineViewAgenda } from 'react-icons/md';

function Lembretes() {
  const nome = 'João Vitor';

  const now = new Date();
  const hours = now.getHours();
  const saudacao =
    hours < 12 ? 'Bom dia' : hours < 18 ? 'Boa tarde' : 'Boa noite';

  const [isVisible, setIsVisible] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [lembretes, setLembretes] = useState([]);
  const [lembreteInput, setLembreteInput] = useState("");

  const togglePanel = () => {
    setIsVisible(prevState => !prevState);
  };

  const adicionarLembrete = () => {
    if (lembreteInput.trim() !== "") {
      setLembretes([...lembretes, lembreteInput]);
      setLembreteInput("");
    }
  };

  const dataDeHoje = new Date();

  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };


  useEffect(() => {
      const fetchConsultas = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/consultas');

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

  // Função para formatar a data e retornar apenas o horário
  const formatarHorario = (dataConsulta) => {
      const data = new Date(dataConsulta); // Cria um objeto Date a partir da string
      return data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formata para HH:MM
  };


  return (
    <>
      <button className="toggleButton" onClick={togglePanel}>
        {isVisible ? <IoCloseSharp size={24} /> : <MdOutlineViewAgenda size={24} />}
      </button>
      <div className={`lembretes_container ${isVisible ? 'active' : ''}`}>
        <div className="render_lembretes">
          <div className="div_user">
            <p>Olá, {nome}</p>
            <p>{saudacao}!</p>
          </div>
          <h3>CONSULTAS</h3>
          <div>
                {consultas.filter(consulta => {
                    const dataConsultaFormatada = formatarData(new Date(consulta.dataconsulta));
                    return dataConsultaFormatada === formatarData(dataDeHoje);
                }).map(consulta => (
                    <h4 key={consulta.codconsulta}>{formatarHorario(new Date(consulta.dataconsulta))} - {consulta.nome}</h4>
                ))}
          </div>
          <div className="Lembretes">
            <h3>ADICIONAR LEMBRETE</h3>
            <div className="div_addLembrete">
              <input 
                type="text" 
                className="input_lembrete" 
                placeholder="Adicionar lembrete" 
                value={lembreteInput}
                onChange={(e) => setLembreteInput(e.target.value)}
              />
              <button type="button" className="btn_addLembrete" onClick={adicionarLembrete}>
                <IoMdAdd size={20} />
              </button>
            </div>
            <div className="lembretes_atuais">
              {lembretes.map((lembrete, index) => (
                <p key={index}>{lembrete}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lembretes;
