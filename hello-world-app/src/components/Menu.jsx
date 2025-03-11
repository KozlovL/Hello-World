import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Импортируем useTheme
import './Menu.css';

function Menu() {
  const { theme } = useTheme(); // Используем контекст темы

  return (
    <nav className={`menu-container ${theme}`}> {/* Применяем тему */}
      <ul className="menu-list">
        <li>
          <Link to="/lab-2" className="menu-link">
            Лабораторная работа 2
          </Link>
        </li>
        <li>
          <Link to="/" className="menu-link">
            Лабораторная работа 3
          </Link>
        </li>
        <li>
          <Link to="/lab-4" className="menu-link">
            Лабораторная работа 4
          </Link>
        </li>
        <li>
          <Link to="/lab-5" className="menu-link">
            Лабораторная работа 5
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;