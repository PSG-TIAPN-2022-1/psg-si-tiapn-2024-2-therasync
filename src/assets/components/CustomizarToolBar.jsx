import React from 'react';
import { Views } from 'react-big-calendar';

function CustomizarToolBar({ label, onNavigate, onView, view }) {
  return (
    <div className="custom-toolbar">
      <div className="navigation-buttons">
        <button onClick={() => onNavigate('PREV')}>Anterior</button>
        <span className="navigation-buttons-label">{label}</span>
        <button onClick={() => onNavigate('NEXT')}>Próximo</button>
      </div>

      <div className="view-buttons">
        <button
          onClick={() => onView(Views.MONTH)}
          className={view === Views.MONTH ? 'active' : ''}
        >
          Mês
        </button>
        <button
          onClick={() => onView(Views.WEEK)}
          className={view === Views.WEEK ? 'active' : ''}
        >
          Semana
        </button>
        <button
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
