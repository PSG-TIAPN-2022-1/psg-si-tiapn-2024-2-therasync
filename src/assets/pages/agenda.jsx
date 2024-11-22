import React from 'react';
import Agendas from '../components/Agenda.jsx';
import { FaRegCalendarAlt } from "react-icons/fa";

const Agenda = () => {
  return (
   
    <div className='container'>
      <p id='titulo_container'><FaRegCalendarAlt></FaRegCalendarAlt> Agenda 
      </p>
      <Agendas></Agendas>
    </div>
  )
}

export default Agenda;