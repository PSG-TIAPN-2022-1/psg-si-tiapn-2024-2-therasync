import React from 'react';
import { IoMdAdd } from "react-icons/io";
import '../styles/pagLembretes.css';


export default function PagLembretes() {


    const nome = 'João Vitor';

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
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
    
    
    const lembretes = 'alskjhdgcyujndfjkdmdnfjk';


  return (
    
    <div className='lembretes_container'>

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
      </div>
  )
}
