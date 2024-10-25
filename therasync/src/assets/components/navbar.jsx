import React from 'react';
import '../styles/navbar.css';
import { IoPeople } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import { IoMdSettings } from "react-icons/io";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MdOutlineViewAgenda } from 'react-icons/md';

export default function Navbar() {

    /*variaveis para icones de estado da nav e função toggle*/

    const [isOpen,setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(open => !open);
    };

    /*Variavei de icones para mudança de estado */
    const openIcon = 
    <FaArrowAltCircleLeft 
    style={{ color: 'white',
         fontSize: '30px' }} 
    className='li_icon'/>;
    
    const closeIcon = 
    <FaArrowAltCircleRight 
    style={{ color: 'white', 
        fontSize: '30px' }} 
        className='li_icon'/>;
    
    const openLogo = 
    <div className='Logo'>
        <LuBrainCircuit 
        style={{ color: 'white', 
            fontSize: '40px' }}/>
        <h4>TheraSync</h4>
    </div>;
    
    const closeLogo = <LuBrainCircuit style={{ color: 'white',
         fontSize: '40px', 
         padding:'10px',
         paddingTop:'10px'
         ,margin:'5px'}}/>;

  return (
    <>
    <nav style={{ width: isOpen ? '250px' : '70px', alignItems:'center'}}>
    <div className='logo_div'>{isOpen ? openLogo : closeLogo}</div>

        <ul>
            
            <li>
                <Link to="/clientes" className='li_icon'>
                    <IoPeople style={{ color: 'white', fontSize: '30px' }}/>
                    {isOpen && <p>Clientes</p>}
                </Link>
            </li>

            <li>
                <Link to="/agenda" className='li_icon'>
                    <TfiAgenda style={{ color: 'white', fontSize: '30px' }}/>
                    {isOpen && <p>Agenda</p>}
                </Link>
            </li>

            <li>
                <Link to="/dashboard" className='li_icon'>
                    <MdOutlineDashboard style={{ color: 'white', fontSize: '30px' }}/>
                    {isOpen && <p>Dashboard</p>}
                </Link>
            </li>

            <li>
                <Link to="/configurações" className='li_icon'>
                    <IoMdSettings style={{ color: 'white', fontSize: '30px' }}/>
                    {isOpen && <p>Configurações</p>}
                </Link>
            </li>

            <li id='icon_lembretes'>
                <Link to="/lembretes" className='li_icon'>
                    <MdOutlineViewAgenda style={{ color: 'white', fontSize: '30px' }}/>
                </Link>
            </li>

            <li className='nav_state'> <div onClick={toggle}>{isOpen ? openIcon : closeIcon} </div></li>

        </ul>

    </nav>
    </>
  )
}
