import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import Lab2 from '../labs/Lab2';
import Lab4 from '../labs/Lab4';
import ThemeToggle from './ThemeToggle';

const Content = () => {
  return (
    <Router>
      <Menu /> {/* Меню теперь отображается на всех страницах */}
      <Routes>
        {/* Главная страница (только меню) */}
        <Route path="/" element={<div>Главная страница</div>} />

        {/* Остальные страницы */}
        <Route path="/lab-2" element={<Lab2 />} />
        <Route path="/lab-4" element={<Lab4 />} />
      </Routes>
      <ThemeToggle /> {/* Кнопка переключения темы также на всех страницах */}
    </Router>
  );
};

export default Content;