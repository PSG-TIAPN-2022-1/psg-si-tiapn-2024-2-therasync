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

  return (
    <>
    <nav>
    <ul className="custom-list" >
     <li className="list-item" id='iconBrain'>
        <LuBrainCircuit className="icon" >
        </LuBrainCircuit>
     </li>
      <li>
        <Link to="/clientes" className="list-item">
          <IoPeople className="icon" />
          <span className="item-label">Clientes</span>
        </Link>
      </li>
      <li>
        <Link to="/agenda" className="list-item">
          <TfiAgenda className="icon" />
          <span className="item-label">Agenda</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard" className="list-item">
          <MdOutlineDashboard className="icon" />
          <span className="item-label">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/configurações" className="list-item">
          <IoMdSettings className="icon" />
          <span className="item-label">Configurações</span>
        </Link>
      </li>
    </ul>
    </nav>
    </>
  )
}