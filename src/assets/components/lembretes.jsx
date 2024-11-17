import '../styles/lembretes.css';
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';
import { MdOutlineViewAgenda } from 'react-icons/md';

function Lembretes() {
  const nome = 'João Vitor';

  const now = new Date();
  const hours = now.getHours();
  const saudacao =
    hours < 12 ? 'Bom dia' : hours < 18 ? 'Boa tarde' : 'Boa noite';

  const [isVisible, setIsVisible] = useState(false);

  const togglePanel = () => {
    setIsVisible(prevState => !prevState);
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
            <h3>CONSULTAS</h3>
            <div className="dados_consulta">
              {/* Substituir com consultas reais */}
              <p>10:00 - Cliente 1</p>
              <p>14:00 - Cliente 2</p>
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
              {/* Substituir com lembretes reais */}
              <p>Lembrete 1</p>
              <p>Lembrete 2</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lembretes;
