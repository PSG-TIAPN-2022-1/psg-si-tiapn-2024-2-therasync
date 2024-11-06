import React from 'react'
import Agendas from '../components/Agenda.jsx'
const Agenda = () => {
  return (
    /*Tudo correspondente a pagina deve estar dentro de container para melhor renderização do conteúdo da pagina */
    <div className='container'>
      <p id='titulo_container'>Agenda</p>
      <Agendas></Agendas>
    </div>
  )
}

export default Agenda;