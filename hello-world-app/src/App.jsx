import React from 'react';
import { useTheme } from './components/ThemeContext';
import Content from './components/Content';
import './App.css'; // Импортируем стили

const App = () => {
  const { theme } = useTheme(); // Получаем текущую тему

  return (
    <div className={theme}> {/* Применяем класс в зависимости от темы */}
      <Content />
    </div>
  );
};

export default App;