import { useState} from 'react'; 
import moment from 'moment'; 
import { Calendar, momentLocalizer } from 'react-big-calendar'; 
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'; 
import '../styles/agenda.css'; 
import  Add from '../components/Add.jsx'
import CustomizarToolBar from './CustomizarToolBar.jsx';


import eventosPadrao from '../components/eventosPadrao.jsx';
import EventoModal from '../components/EventoModal';

const DragAndDropAgenda = withDragAndDrop(Calendar);

const localizador = momentLocalizer(moment);

function Agenda() {
  const [eventos, setEventos] = useState(eventosPadrao);
  const[eventoSelecionado, setEventoSelecionado] = useState(null);


  const moverEventos = (data) => {     
    const{start, end} = data;
    const updatedEvents = eventos.map((event) =>{
        if(event.id === data.event.id){
            return{
                ...event,
                start: new Date(start),
                end: new Date(end)
            };
        }
        return event;
    });

    setEventos(updatedEvents);
  }

  const handleEventClick = (evento) => {
    setEventoSelecionado(evento);
  } 

  const handleEventClose = () => {
    setEventoSelecionado(null);
  }

  const handleAdd = (novoEvento) => {
    setEventos([...eventos, {...novoEvento, id: eventos.length + 1}]); 
  }

  const handleEventDelete = (eventoId) => {
      const updatedEvents = eventos.filter((evento) => evento.id !== eventoId)
      setEventos(updatedEvents);
      setEventoSelecionado(null);
  }

  const handleEventUpdate = (updatedEvent) =>{
    const updatedEvents = eventos.map((evento) =>{
      if(evento.id === updatedEvent.id){
        return updatedEvent;
      }
      return evento;
    })
    setEventos(updatedEvents);
    setEventoSelecionado(null)
  }

  return (
    <div className="tela">
      <div className="toolbar p-4">
        <Add onAdd={handleAdd} />
      </div>

      <div>
        <DragAndDropAgenda
          defaultDate={moment().toDate()} 
          defaultView="month" 
          events={eventos} 
          localizer={localizador} 
          onEventDrop={moverEventos}
          onEventResize={moverEventos}
          onSelectEvent={handleEventClick}
          components={{
            toolbar: CustomizarToolBar,
          }}
          className="agendaDeD" 
        />
        {eventoSelecionado && (
          <EventoModal evento={eventoSelecionado} onClose={handleEventClose} onDelete={handleEventDelete} onUpdate={handleEventUpdate}/>
        )}
      </div>
    </div>
  )   
}

export default Agenda;