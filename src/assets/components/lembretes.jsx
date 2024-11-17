import { useState, useEffect } from 'react';
import '../styles/lembretes.css';
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineViewAgenda } from 'react-icons/md';
import { MdDelete } from "react-icons/md";

function Lembretes() {
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

  const fetchConsultas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/consultas');
      if (!response.ok) {
        throw new Error('Erro ao buscar consultas');
      }
      const data = await response.json();
      console.log('Consultas recebidas da API:', data);
      setConsultas(data);
    } catch (error) {
      console.error('Erro ao fazer o fetch:', error);
    }
  };

  const formatarData = (data) => {
    const date = new Date(data);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  };

  const isHoje = (dataConsulta) => {
    const hoje = new Date();
    const dataConsultaObj = new Date(dataConsulta);

    return hoje.getUTCFullYear() === dataConsultaObj.getUTCFullYear() &&
           hoje.getUTCMonth() === dataConsultaObj.getUTCMonth() &&
           hoje.getUTCDate() === dataConsultaObj.getUTCDate();
  };

  const gerarLembretes = () => {
    try {
      const novosLembretes = consultas
        .filter(consulta => isHoje(consulta.dataConsulta))
        .map(consulta => ({
          nomePaciente: consulta.nome,
          dataConsulta: formatarData(consulta.dataConsulta),
        }));

      console.log('Lembretes gerados:', novosLembretes);
      setLembretes(novosLembretes);
    } catch (error) {
      console.error('Erro ao gerar lembretes:', error);
    }
  };

  const salvarLembretesNoStorage = (novosLembretes) => {
    localStorage.setItem('lembretes', JSON.stringify(novosLembretes));
  };

  const carregarLembretesDoStorage = () => {
    const lembretesStorage = JSON.parse(localStorage.getItem('lembretes')) || [];
    setLembretes(lembretesStorage);
  };

  const adicionarLembrete = () => {
    if (!lembreteInput.trim()) return; // Evita adicionar lembrete vazio

    const novoLembrete = {
      nomePaciente: 'Novo Lembrete',
      dataConsulta: formatarData(new Date()),
      descricao: lembreteInput
    };

    const lembretesAtuais = [...lembretes, novoLembrete];
    setLembretes(lembretesAtuais);
    salvarLembretesNoStorage(lembretesAtuais);
    setLembreteInput(""); // Limpa o input após adicionar
  };

  const removerLembrete = (index) => {
    const lembretesAtualizados = lembretes.filter((_, i) => i !== index);
    setLembretes(lembretesAtualizados);
    salvarLembretesNoStorage(lembretesAtualizados);
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  useEffect(() => {
    carregarLembretesDoStorage();
  }, []);

  useEffect(() => {
    if (consultas.length > 0) {
      gerarLembretes();
    }
  }, [consultas]);

  return (
    <>
      <button className="toggleButton" onClick={togglePanel}>
        {isVisible ? <IoCloseSharp size={24} /> : <MdOutlineViewAgenda size={24} />}
      </button>
      <div className={`lembretes_container ${isVisible ? 'active' : ''}`}>
        <div className="render_lembretes">
          <div className="div_user">
            <p>Olá João, {saudacao}</p>
          </div>
          <div className="consultasDia">
            <h3>LEMBRETES</h3>
            <div className="dados_consulta">
              {lembretes.length > 0 ? (
                lembretes.map((lembrete, index) => (
                  <p key={index}>
                    {lembrete.dataConsulta} - {lembrete.descricao}
                    <MdDelete 
                      size={24} 
                      className="icon-hover" 
                      onClick={() => removerLembrete(index)} 
                    />
                  </p>
                ))
              ) : (
                <p>Sem lembretes para o dia</p>
              )}
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Lembretes;
