// components/Content.js
import React from "react";
import { Route, Routes } from "react-router-dom"; // Для маршрутизации
import Menu from "./Menu"; // Меню, которое будет открываться по кнопке
import HomePage from "./HomePage"; // Главная страница
import AboutMePage from "./AboutPage"; // Страница "О себе"
import FeedbackPage from "./FeedbackPage"; // Страница обратной связи
import ContactPage from "./ContactPage"; // Страница контактов
import Lab2 from "../labs/Lab2"; // Лабораторная работа 2
import Lab4 from "../labs/Lab4"; // Лабораторная работа 4
import Lab5 from "../labs/Lab5"; // Лабораторная работа 5
import Lab6 from "../labs/Lab6"; // Лабораторная работа 6
import "./Content.css"; // Подключаем стили

const Content = () => {
  return (
    <div className="content-container">
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<HomePage />} />

        {/* Страница "О себе" */}
        <Route path="/about-me" element={<AboutMePage />} />

        {/* Страница обратной связи */}
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* Страница контактов */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Остальные страницы */}
        <Route path="/lab-2" element={<Lab2 />} />
        <Route path="/lab-4" element={<Lab4 />} />
        <Route path="/lab-5" element={<Lab5 />} />
        <Route path="/lab-6" element={<Lab6 />} />
      </Routes>
    </div>
  );
};

export default Content;
