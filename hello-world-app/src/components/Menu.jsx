import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <nav className="menu-container">
      <ul className="menu-list">
        <li>
          <Link to="/lab-2">Лабораторная работа 2</Link>
        </li>
        <li>
          <Link to="/">Лабораторная работа 3</Link> {/* Главная страница */}
        </li>
        <li>
          <Link to="/lab-4">Лабораторная работа 4</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;

