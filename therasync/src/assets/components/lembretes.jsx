import React, { useEffect } from 'react';
import '../styles/lembretes.css';
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';
import { MdOutlineViewAgenda } from 'react-icons/md';

function Lembretes() {

  /*usuario lembretes*/
    const nome = 'João Vitor';

    const now = new Date();
    const hours = now.getHours(); // Retorna as horas (0-23)
    const minutes = now.getMinutes(); // Retorna os minutos (0-59)
    let saudacao;

    switch (true) {
      case (hours < 12):
        saudacao = 'Bom dia';
        break;
      case (hours >= 12 && hours < 18):
        saudacao = 'Boa tarde';
        break;
      default:
        saudacao = 'Boa noite';
    }

    /*dados consulta */
    const horario_consulta = now.getHours(); 
    const minutos_consulta = String(minutes).padStart(2, '0');
    const nomeCliente = 'Maria chaves';

    const consultas = [
      { horario: `${horario_consulta}:${minutos_consulta}`, cliente: 'xxx' },
      { horario: `${horario_consulta}:${minutos_consulta}`, cliente: 'Joana' },
      { horario: `${horario_consulta}:${minutos_consulta}`, cliente: nomeCliente },
      { horario: `${horario_consulta}:${minutos_consulta}`, cliente: nomeCliente },
      { horario: `${horario_consulta}:${minutos_consulta}`, cliente: nomeCliente },
      { horario: `${horario_consulta}:${minutos_consulta}`, cliente: nomeCliente },
      { horario: `${horario_consulta}:${minutos_consulta}`, cliente: nomeCliente }
    ];
    
    
    /*Dados Lembrete */
    const lembretes = 'alskjhdgcyujndfjkdmdnfjk';

    /*estado do lembretes em telas maiores */

    const [isVisible, setIsVisible] = useState(false); 

    const handleClose = () => {
      setIsVisible(prevState => !prevState); 
    };

    const openLembretes = <IoCloseSharp size={30} />;
    const closeLembretes = <MdOutlineViewAgenda size={30}></MdOutlineViewAgenda>;

  return (

      <div className='lembretes_container'>

      <div className="closeIcon" onClick={handleClose}>
      {isVisible ? openLembretes : closeLembretes}
      </div>
        {isVisible && (
          <div className="render_lembretes">
                      <div className="div_user">
              <p>Olá, {nome}</p>
              <p>{saudacao}!</p>
          </div>

          <div className="consultasDia">
              <h3>CONSULTAS</h3>

              <div className="dados_consulta">

                {consultas.map((consulta, index) => (
                <p className='dado_consulta' key={index}>{consulta.horario} - {consulta.cliente}</p>
              ))}

              </div>
          </div>

          <div className="Lembretes">
              <h3>LEMBRETES</h3>

              <div className="div_addLembrete">
                  <input type="text" className="input_lembrete" />
                  <button type="button"><IoMdAdd size={30}></IoMdAdd></button>
              </div>

              <div className="lembretes_atuais">
                  <p>{lembretes}</p>
              </div>
          </div>
          </div>
        )}
      
      </div> 

  )
}

export default Lembretes