import React, { useState } from 'react'; // Importando useState
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
          <div className="consultasDia">
            <h3>LEMBRETES</h3>
            <div className="dados_consulta">
              {/* Substituir com consultas reais */}
              <p>10:00 - Cliente 1</p>
              <p>14:00 - Cliente 2</p>
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
