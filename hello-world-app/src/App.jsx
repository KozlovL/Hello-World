import React from 'react';
import { useTheme } from './components/ThemeContext';
import Content from './components/Content';
import Header from './components/Header'; // Импортируем Header
import Footer from './components/Footer'; // Импортируем Footer
import './App.css'; // Импортируем стили

const App = () => {
  const { theme } = useTheme(); // Получаем текущую тему

  return (
    <div className={theme}> {/* Применяем класс в зависимости от темы */}
      <Header /> {/* Вставляем Header */}
      <Content />
      <Footer /> {/* Вставляем Footer */}
    </div>
  );
};

export default App;