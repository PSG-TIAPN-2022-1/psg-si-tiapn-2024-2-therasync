import React from 'react';
import { Views } from 'react-big-calendar';

function CustomizarToolBar({ label, onNavigate, onView, view }) {
  return (
    <div className="custom-toolbar" style={{ margin: "0 auto", padding: "20px"}}>
      <div className="navigation-buttons">
        <button onClick={() => onNavigate('PREV')} style={{ width: "100px" ,backgroundColor: "red"}}>Anterior</button>
        <span className="navigation-buttons-label">{label}</span>
        <button onClick={() => onNavigate('NEXT')} style={{ width: "100px" , backgroundColor: "green"}}>Próximo</button>
      </div>

      <div className="view-buttons">
        <button
          style={{ width: "100px" }}
          onClick={() => onView(Views.MONTH)}
          className={view === Views.MONTH ? 'active' : ''}
        >
          Mês
        </button>
        <button
          style={{ width: "100px" }}
          onClick={() => onView(Views.WEEK)}
          className={view === Views.WEEK ? 'active' : ''}
        >
          Semana
        </button>
        <button
          style={{ width: "100px" }}
          onClick={() => onView(Views.DAY)}
          className={view === Views.DAY ? 'active' : ''}
        >
          Dia
        </button>
      </div>
    </div>
  );
}

export default CustomizarToolBar;
