import { useState } from "react";

const CustomizarToolBar = ({label, onView, onNavigate, views}) =>{

    const [itemText, setItemText] = useState('month')
  
    return(
      <div className='cabecalho-container'>
        <h1 className='mesAno'>{label}</h1>
  
        <div className="dirtop">
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type='button' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false'>
              {itemText}
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              {views.map((view, index) => (
                <div kay={index}> 
                  <li>
                    <button className='dropdown-item' onClick={() => onView(view) + setItemText(view)}>{view}</button>
                  </li>
                  {index === 2 && <hr className='dropdown-divider'></hr>}
                </div>
              ))}
            </ul>
          </div>
  
          <div className='tollbar-navegation' style={{marginLeft: '15px'}}>
            <button className='btn bg-warning btn-ls mr-2 border-0' onClick={() => onNavigate('TODAY')}>Hoje</button>
            <button className='btn btn-lg mr-2 text-secondary' style={{ marginLeft: '15px'}} onClick={() => onNavigate('PREV')}><i class="bi bi-arrow-left-circle-fill"></i></button>
            <button className='btn btn-lg  mr-2 text-secondary' onClick={() => onNavigate('NEXT')}><i class="bi bi-arrow-right-circle-fill "></i></button>
          </div>
        </div>
      </div>
    )
  }

export default CustomizarToolBar;